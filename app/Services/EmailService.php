<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class EmailService
{
    /**
     * Send a plain notification email to the admin.
     * Uses Laravel's Mail facade which is already configured for Brevo SMTP.
     */
    public function sendAdminNotification(string $subject, string $body): void
    {
        $adminEmail = config('app.admin_email', env('ADMIN_EMAIL'));

        if (! $adminEmail) {
            return;
        }

        Mail::raw($body, function (Message $message) use ($subject, $adminEmail) {
            $message->to($adminEmail)
                    ->subject($subject);
        });
    }

    /**
     * Notify admin when a download milestone is reached.
     */
    public function notifyDownloadMilestone(int $count): void
    {
        $this->sendAdminNotification(
            subject: "🎉 KyroPad hit {$count} downloads!",
            body: "Congratulations! KyroPad has reached {$count} total downloads.\n\nLog in to the admin panel to view the full breakdown.",
        );
    }

    /**
     * Notify admin when a new revenue entry is added.
     */
    public function notifyNewRevenue(float $amount, string $source): void
    {
        $this->sendAdminNotification(
            subject: "💰 New KyroPad revenue entry: \${$amount}",
            body: "A new revenue entry of \${$amount} from {$source} has been recorded in your KyroPad dashboard.",
        );
    }
}
