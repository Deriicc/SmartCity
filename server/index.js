const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

// 163邮箱配置
const EMAIL_CONFIG = {
  host: 'smtp.163.com',
  user: '18511862928@163.com', // 替换成你的163邮箱
  pass: 'VFkqxebjuCrVpuyR', // 替换成你的163邮箱授权码
};

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: EMAIL_CONFIG.host,
  port: 465, // 163邮箱的SSL端口
  secure: true, // 使用SSL
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },
});

// 存储验证码
const verificationCodes = new Map();

app.post('/send-verification', async (req, res) => {
  const {email} = req.body;

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('存储新验证码:', {
      email,
      code,
      timestamp: Date.now(),
    });

    verificationCodes.set(email, {
      code,
      timestamp: Date.now(),
    });

    await transporter.sendMail({
      from: EMAIL_CONFIG.user, // 必须与认证邮箱一致
      to: email,
      subject: '智慧城市 - 注册验证码',
      html: `
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
          <h2 style="color: #1890ff;">智慧城市注册验证码</h2>
          <p>您好！</p>
          <p>您的验证码是：<span style="color: #1890ff; font-size: 20px; font-weight: bold;">${code}</span></p>
          <p>验证码有效期为5分钟，请尽快完成注册。</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">如果这不是您的操作，请忽略此邮件。</p>
        </div>
      `,
    });

    console.log('验证码发送成功:', email, code);
    res.json({success: true});
  } catch (error) {
    console.error('发送失败:', error);
    res.status(500).json({
      success: false,
      message: '发送失败，请稍后重试',
    });
  }
});

// 验证验证码
app.post('/verify-code', (req, res) => {
  const {email, code} = req.body;

  // 添加请求体的完整日志
  console.log('收到的完整请求体:', req.body);

  // 确保输入数据被正确处理
  const sanitizedEmail = email?.trim();
  const sanitizedCode = code?.toString().trim();

  console.log('验证请求:', {
    receivedEmail: sanitizedEmail,
    receivedCode: sanitizedCode,
    storedData: verificationCodes.get(sanitizedEmail),
    allCodes: Array.from(verificationCodes.entries()),
  });

  const storedData = verificationCodes.get(sanitizedEmail);

  // 检查是否存在验证码记录
  if (!storedData) {
    console.log('未找到验证码记录:', sanitizedEmail);
    return res.json({
      success: false,
      message: '验证码已过期或不存在，请重新获取',
    });
  }

  // 检查验证码是否过期
  if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
    console.log('验证码已过期:', {
      now: Date.now(),
      stored: storedData.timestamp,
      diff: Date.now() - storedData.timestamp,
    });
    verificationCodes.delete(sanitizedEmail);
    return res.json({
      success: false,
      message: '验证码已过期，请重新获取',
    });
  }

  // 修改验证码比较逻辑，确保类型一致性
  const storedCode = String(storedData.code).trim();
  const receivedCode = String(sanitizedCode).trim();
  const isMatch = storedCode === receivedCode;

  console.log('验证码详细比较:', {
    storedCode,
    receivedCode,
    storedCodeLength: storedCode.length,
    receivedCodeLength: receivedCode.length,
    isMatch,
  });

  if (!isMatch) {
    return res.json({
      success: false,
      message: '验证码错误',
      debug:
        process.env.NODE_ENV === 'development'
          ? {
              stored: storedCode,
              received: receivedCode,
            }
          : undefined,
    });
  }

  // 验证成功，删除已使用的验证码
  verificationCodes.delete(sanitizedEmail);
  console.log('验证成功，已删除验证码');

  res.json({success: true});
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
