const { BadRequestError } = require('../../errors');
const smtpTransport = require('../../email');

const { MAILGUN_EMAIL } = process.env;

const changePassword = async (req, res, next) => {
  try {
    const { user } = req;

    const {
      newPassword,
      confirmPassword
    } = req.body;

    if (newPassword !== confirmPassword) {
      throw new BadRequestError('The passwords do not match');
    }

    await user.update({
      password: newPassword
    });

    const emailConfig = {
      to: user.email,
      from: MAILGUN_EMAIL,
      template: 'change-password-success',
      subject: 'Password Change Confirmation',
      context: {
        username: user.username
      }
    };

    await smtpTransport.sendMail(emailConfig);

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

module.exports = changePassword;
