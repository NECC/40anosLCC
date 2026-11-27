
export function renderOtpEmail(otp: string) {

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#06151D" style="background-color:#06151D;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#091c28" style="max-width:480px;background-color:#091c28;border:1px solid #1f2937;border-radius:16px;">
            <tr>
              <td style="padding:40px 32px;font-family:Arial,Helvetica,sans-serif;">

                <div style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;letter-spacing:3px;color:#00a8e8;text-transform:uppercase;padding-bottom:12px;">
                  Verify email
                </div>

                <div style="font-size:28px;font-weight:500;color:#ffffff;padding-bottom:16px;">
                  Your sign-in code
                </div>

                <div style="font-size:14px;color:#d1d5db;padding-bottom:24px;">
                  Use this six-digit code to sign in to LCC 40 Anos.
                </div>

                <div style="font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:bold;letter-spacing:10px;color:#ffffff;padding-bottom:24px;user-select:all;-webkit-user-select:all;">
                  ${otp}
                </div>

                <div style="font-size:12px;color:#9ca3af;">
                  This code expires in 5 minutes. If you didn't request it, you can ignore this email.
                </div>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}