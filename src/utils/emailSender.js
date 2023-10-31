import emailjs from '@emailjs/browser'; 

const templateId = 'template_7823293';
const userId = '1bSLw8IKYjG-jf0PZ';

function sendCustomEmail(userEmail, userName, message) {
    const params = {
        to_email: userEmail,
        recipient_name: userName,
        message,
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