import nodemailer from 'nodemailer' 

const from = 'from<>'

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

export default function sendConfirmationEmail(user) {
    const transport = setup()
    const email = {
        from,
        to: user.email,
        subject: '欢迎使用NotHelp文献管理系统',
        text: `
            欢迎加入NotHelp，请通过下面链接验证您的邮箱：
            ${user.generateConfirmationUrl()}
        `
    }

    transport.sendMail(email)
}