<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Feedback extends Model
{
    protected $fillable = [
        'message',
        'ip_address',
        'user_agent',
    ];
}
