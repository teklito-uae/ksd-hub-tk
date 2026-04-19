<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Kasaragod Hub</title>
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  .wrapper { width: 100%; table-layout: fixed; background-color: #f9fafb; padding-bottom: 40px; }
  .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #111827; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-top: 40px; }
  .header { background-color: #f04438; padding: 40px 30px; text-align: center; color: #ffffff; }
  .header h1 { margin: 0; font-size: 28px; letter-spacing: -0.5px; }
  .content { padding: 40px 30px; }
  .content h2 { margin-top: 0; font-size: 22px; color: #111827; }
  .content p { font-size: 16px; line-height: 1.6; color: #4b5563; }
  .card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
  .card-icon { font-size: 24px; margin-bottom: 10px; }
  .card-title { font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 5px 0; }
  .card-text { font-size: 14px; color: #4b5563; margin: 0; line-height: 1.5; }
  .btn-wrapper { text-align: center; margin: 30px 0; }
  .btn { display: inline-block; background-color: #f04438; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; font-size: 16px; }
  .footer { background-color: #f3f4f6; padding: 30px; text-align: center; color: #6b7280; font-size: 13px; }
  .footer a { color: #f04438; text-decoration: none; }
</style>
</head>
<body>
<center class="wrapper">
  <table class="main" width="100%">
    <tr>
      <td class="header">
        <h1>Welcome to Kasaragod Hub! 🚀</h1>
        <p style="color: #fee2e2; margin-top: 10px; font-size: 16px;">The ultimate local network.</p>
      </td>
    </tr>
    <tr>
      <td class="content">
        <h2>Hi {{ $name }},</h2>
        <p>Thank you for joining Kasaragod Hub. We're thrilled to have you on board! Whether you are here to explore local services, list your business, or showcase your expertise, you've come to the right place.</p>
        
        @if($userType === 'business' || $userType === 'pro')
            <p><strong>As a registered {{ $userType === 'business' ? 'Business' : 'Professional' }}, here is what you can do:</strong></p>
            <div class="card">
                <div class="card-icon">🌍</div>
                <h3 class="card-title">Get Discovered Locally</h3>
                <p class="card-text">Set up your profile and get discovered by thousands of users searching for your services across Kasaragod.</p>
            </div>
            <div class="card">
                <div class="card-icon">💬</div>
                <h3 class="card-title">Direct WhatsApp Leads</h3>
                <p class="card-text">Receive inquiries directly to your phone. No middlemen, no commissions.</p>
            </div>
            <div class="card">
                <div class="card-icon">📊</div>
                <h3 class="card-title">Track Performance</h3>
                <p class="card-text">View analytics on how many people visited your profile and clicked your contact info.</p>
            </div>
            
            <div class="btn-wrapper">
                <a href="{{ env('FRONTEND_URL', 'https://kasaragodhub.com') }}/dashboard/{{ $userType }}" class="btn">Complete Your Profile</a>
            </div>
        @else
            <p><strong>Here is what you can explore as a user:</strong></p>
            <div class="card">
                <div class="card-icon">🔍</div>
                <h3 class="card-title">Find Trusted Services</h3>
                <p class="card-text">From top-rated restaurants to reliable plumbers and hospitals across Kasaragod.</p>
            </div>
            <div class="card">
                <div class="card-icon">⭐</div>
                <h3 class="card-title">Review & Save</h3>
                <p class="card-text">Save your favorite businesses and professionals to quickly access their contacts later.</p>
            </div>
            
            <div class="btn-wrapper">
                <a href="{{ env('FRONTEND_URL', 'https://kasaragodhub.com') }}/directory" class="btn">Explore Directory</a>
            </div>
        @endif
        
        <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
        <p>Best regards,<br><strong>The Kasaragod Hub Team</strong></p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p>Kasaragod Hub &copy; {{ date('Y') }}. All rights reserved.</p>
        <p>You are receiving this email because you registered on <a href="{{ env('FRONTEND_URL', 'https://kasaragodhub.com') }}">Kasaragod Hub</a>.</p>
      </td>
    </tr>
  </table>
</center>
</body>
</html>
