// Get the modal
const imageModal = document.getElementById('imageModal');
const shareModal = document.getElementById('shareModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == imageModal || event.target == shareModal) {
        imageModal.style.display = 'none';
        shareModal.style.display = 'none';
    }
};

const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');

function openImageModal(e) {
    imageModal.style.display = 'block';
    modalImg.src = e.src;
    captionText.innerHTML = e.alt;
}

// Get the <span> element that closes the modal
const imageModalClose = document.getElementById('imageModalClose');

// When the user clicks on <span> (x), close the modal
imageModalClose.onclick = function () {
    imageModal.style.display = 'none';
};


function openShareModal(e, title) {
    if (navigator.share) {
        navigator.share({
            title,
            url: window.location.href,
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch(console.error);
    } else {
        shareModal.style.display = 'flex';
    }
}

// Get the <span> element that closes the modal
const shareModalClose = document.getElementById('shareModalClose');

// When the user clicks on <span> (x), close the modal
shareModalClose.onclick = function () {
    shareModal.style.display = 'none';
};


function handleWhatsappShare(e) {
    const { value } = document.getElementById('whatsapp-input');
    var country_code=document.getElementById("country_code").value;
    if (value.length < 10) {
        e.preventDefault();
        return;
    }
    //alert(iti.getNumber());
    e.href = `https://wa.me/${country_code+value}?text=${window.location.href}`;
}
function handleDirectWhatsappShare(e, whatsappNumber) {
    if (window.mobileCheck()) {
        e.href = `whatsapp:\/\/send?text=${window.location.href}`;
    } else if (whatsappNumber) {
        e.href = `https://wa.me/91${whatsappNumber}?text=${window.location.href}`;
    } else {
        e.href = `whatsapp:\/\/send?text=${window.location.href}`;
    }
}

function inquiry_store() {
    $("#enquiry_form").validate({
        rules: {
            enquiryName: {
                required: true,
                maxlength: 50
            },
            phoneNumber: {
                noSpace: true,
                maxlength: 10
            },
            email: {
                noSpace: true,
                required: true,
                maxlength: 50
            }
        },
        messages: {
            fullname: {
                required: "product Limit should not be blank."
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            var url = SITE_URL+"/process.php";
            var watsup_url = WP_URL+'phone=91' + $whatsappNumber + '&text=';
            var formData = $("#enquiry_form").serialize();
            returnVal = ajaxCall(url, formData);
            var res = {};
            if (returnVal) {
                if (returnVal.status === true) {
                    res.msg = returnVal.message;
                    window.open(watsup_url + res.msg, "_blank");
                } else {
                    res.msg = returnVal.message;
                    return false;
                }
            }
        }
    });
}

// Feedback code
const starRatingControl = new StarRating('.star-rating', {
    maxStars: 5,
});

function sendFeedback(ele, cardId) {
    ele.value = 'Sending...';
    ele.disabled = true;
    const feedbackList = document.getElementsByClassName('feedback-list')[0];
    const rating = document.getElementById('rating');
    const name = document.getElementById('feedbackName');
    const feedback = document.getElementById('feedback');
    const data = {};
    data.cardId = cardId;
    data.rating = rating.value;
    data.name = name.value;
    data.feedback = feedback.value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            const response = JSON.parse(this.response);
            if (this.status === 200) {
                alert('Success: Feedback Given Successfully');
                rating.value = 5;
                name.value = '';
                feedback.value = '';
                setTimeout(function(){ $('#rating').next().removeClass('s10');
                $('#rating').next().removeClass('s20');
                $('#rating').next().removeClass('s30');
                $('#rating').next().removeClass('s40');
                $('#rating').next().addClass('s50'); 
                $('#rating').next().next().html('Excellent'); 
                
            }, 30);
                
                // Pushing new feedback in the list
                const feedbackResponse = response.data.feedback;
                const newFeedback = `<div class="feedback-wrapper">
                    <span class="feedback-name-wrapper"><span class="feedback-name">${feedbackResponse.name}</span> on ${feedbackResponse.date} </span>
                    <div><span class="gl-star-rating-stars s${feedbackResponse.rating}0"><span data-value="1" data-text="Terrible"></span><span data-value="2" data-text="Poor"></span><span data-value="3" data-text="Average"></span><span data-value="4" data-text="Very Good"></span><span data-value="5" data-text="Excellent"></span></span></div>
                    <div>${feedbackResponse.feedback}</div>
                    <hr />
                </div>`;
                feedbackList.insertAdjacentHTML('afterbegin', newFeedback);
            } else {
                alert(`Error: ${response.data.message}`);
            }
            ele.value = 'Give Feedback';
            ele.disabled = false;
        }
    };
    xhr.open('POST', SITE_URL+'/process.php');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
}

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js').then(
//         () => {
//             console.log('Service Worker Registered');
//         },
//     );
// }

// window.addEventListener('DOMContentLoaded', () => {
//     let deferredPrompt;
//     const saveBtn = document.querySelector('.save-card-button');
//     saveBtn.style.display = 'none';

//     window.addEventListener('beforeinstallprompt', (e) => {
//         // Prevent Chrome 67 and earlier from automatically showing the prompt
//         e.preventDefault();
//         // Stash the event so it can be triggered later.
//         deferredPrompt = e;
//         // Update UI to notify the user they can add to home screen
//         saveBtn.style.display = 'block';

//         saveBtn.addEventListener('click', (e) => {
//             // hide our user interface that shows our A2HS button
//             saveBtn.style.display = 'none';
//             // Show the prompt
//             deferredPrompt.prompt();
//             // Wait for the user to respond to the prompt
//             deferredPrompt.userChoice.then((choiceResult) => {
//                 if (choiceResult.outcome === 'accepted') {
//                     console.log('User accepted the A2HS prompt');
//                 } else {
//                     console.log('User dismissed the A2HS prompt');
//                 }
//                 deferredPrompt = null;
//             });
//         });
//     });
// });
