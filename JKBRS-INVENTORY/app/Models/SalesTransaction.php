<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'office_id',
        'user_id',
        'transaction_number',
        'type',
        'customer_name',
        'customer_phone',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'payment_method',
        'status',
        'notes',
        'transaction_date',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'transaction_date' => 'datetime',
    ];

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class, 'transaction_id');
    }

    // Format amounts with Tsh currency
    public function getFormattedSubtotalAttribute(): string
    {
        return 'Tsh ' . number_format($this->subtotal, 2);
    }

    public function getFormattedTotalAmountAttribute(): string
    {
        return 'Tsh ' . number_format($this->total_amount, 2);
    }

    public function getFormattedTaxAmountAttribute(): string
    {
        return 'Tsh ' . number_format($this->tax_amount, 2);
    }

    public function getFormattedDiscountAmountAttribute(): string
    {
        return 'Tsh ' . number_format($this->discount_amount, 2);
    }

    // Generate unique transaction number
    public static function generateTransactionNumber(): string
    {
        $prefix = 'TXN';
        $date = now()->format('Ymd');
        $count = self::whereDate('created_at', today())->count() + 1;
        return $prefix . $date . str_pad($count, 4, '0', STR_PAD_LEFT);
    }
}
