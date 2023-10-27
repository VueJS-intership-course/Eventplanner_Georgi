import emailjs from '@emailjs/browser'; 

const templateId = 'template_7823293';
const userId = '1bSLw8IKYjG-jf0PZ';

function sendCustomEmail(userEmail, userName) {
    const params = {
        to_email: userEmail,
        recipient_name: userName,
        message: 'There is a new event on Eventify, check it out and don\'t miss the opportunity',
    };

    emailjs.send('service_ejhlbig', templateId, params, userId)
        .then(function (response) {
            console.log('Email sent:', response);
        })
        .catch(function (error) {
            console.error('Email not sent:', error);
        });
}


export default sendCustomEmail