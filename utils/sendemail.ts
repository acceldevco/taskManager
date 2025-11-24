
// import { Resend } from "resend";
import nodemailer from "nodemailer";
// تنظیمات Resend
// const resend = new Resend(process.env.RESEND_API_KEY);
const EMILUSER: string = process.env.EMILUSER!
const EMILPASS: string = process.env.EMILPASS!
const HOSTEMAIL: string = process.env.HOSTEMAIL!
// تابع ارسال ایمیل ورود
export const sendVerificationEmail = async (
  email: string,
  verifyToken: any
) => {
  //  const verifyUrl = `https://localhost:3000/api/verify?token=${verifyToken}`
  // بررسی داده‌های ورودی
  if (!email || !verifyToken) {
    throw new Error("Missing required fields");
  }

  try {
    // const { to, subject, text } = await req.json();

    // const response = await axios.post(
    //   "https://api.elasticemail.com/v2/email/send",
    //   null,
    //   {
    //     params: {
    //       apikey: process.env.ELASTIC_EMAIL_API_KEY,
    //       from: process.env.ELASTIC_EMAIL_FROM,
    //       to: email,
    //       subject: "Login to Your Account",
    //       // bodyText: text,
    //       bodyHtml: `
    //   <p>Hi ${email},</p>
    //   <p>Click the link below to log in to your account:</p>
    //   <a href="${verifyToken}">Login to Your Account</a>
    //   <p>If you didn’t request this, please ignore this email.</p>
    // `,
    //       isTransactional: true,
    //     },
    //   }
    // );

    // console.log(response);

    // کانفیگ SMTP از cPanel
    const transporter = nodemailer.createTransport({
      host: HOSTEMAIL,//"mail.acceldevco.ir", // آدرس SMTP از cPanel
      port: 465, // SSL: 465 یا TLS: 587
      secure: true, // true برای SSL، false برای TLS
      auth: {
        user: EMILUSER,
        pass: EMILPASS
      },
    });

    // ارسال ایمیل
    await transporter.sendMail({
      from: '"Your App Name" <no-reply@yourdomain.com>',
      to: email,
      subject: "Login to Your Account",
      // text,
      html: `<p>سلام ${email}،</p>

<p>ما درخواست ورود به حساب کاربری شما را دریافت کردیم.</p>

<p>برای ورود ایمن به حساب خود، روی دکمه زیر کلیک کنید:</p>

<p style="text-align:center;">
  <a href="${verifyToken}" 
     style="display:inline-block; padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:5px;">
    ورود به حساب کاربری
  </a>
</p>

<p>اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید. هیچ تغییری در حساب شما ایجاد نخواهد شد.</p>

<p>با تشکر،<br>
تیم YourAppName</p>
`,
    });

    // console.log(test);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(
      "Elastic Email Error:",
      error.response?.data || error.message
    );
    return Response.json(
      { success: false, error: error.response?.data || error.message },
      { status: 500 }
    );
  }

  // ارسال ایمیل
  // const { data, error } = await resend.emails.send({
  //   from: 'Acme <onboarding@resend.dev>',
  //   to: [email],
  //   subject: 'Login to Your Account',
  //   html: `
  //     <p>Hi ${email},</p>
  //     <p>Click the link below to log in to your account:</p>
  //     <a href="${verifyToken}">Login to Your Account</a>
  //     <p>If you didn’t request this, please ignore this email.</p>
  //   `,
  // });

  // return Response.json({ success: true, data: response.data });

  // if (error) {
  //   throw new Error(error.message); // در صورت خطا، پیام خطا را برمی‌گرداند
  // }

  // return data; // داده‌هایی که از سرویس ارسال ایمیل دریافت شده‌اند
};
