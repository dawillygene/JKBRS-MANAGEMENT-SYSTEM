<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payroll extends Model
{
    use HasFactory;

    protected $table = 'payroll';

    protected $fillable = [
        'user_id',
        'office_id',
        'period_month',
        'basic_salary',
        'allowances',
        'overtime_pay',
        'deductions',
        'tax_deduction',
        'net_salary',
        'status',
        'pay_date',
        'notes',
    ];

    protected $casts = [
        'basic_salary' => 'decimal:2',
        'allowances' => 'decimal:2',
        'overtime_pay' => 'decimal:2',
        'deductions' => 'decimal:2',
        'tax_deduction' => 'decimal:2',
        'net_salary' => 'decimal:2',
        'pay_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    // Format amounts with Tsh currency
    public function getFormattedBasicSalaryAttribute(): string
    {
        return 'Tsh ' . number_format($this->basic_salary, 2);
    }

    public function getFormattedNetSalaryAttribute(): string
    {
        return 'Tsh ' . number_format($this->net_salary, 2);
    }

    public function getFormattedAllowancesAttribute(): string
    {
        return 'Tsh ' . number_format($this->allowances, 2);
    }

    public function getFormattedDeductionsAttribute(): string
    {
        return 'Tsh ' . number_format($this->deductions, 2);
    }

    public function getFormattedTaxDeductionAttribute(): string
    {
        return 'Tsh ' . number_format($this->tax_deduction, 2);
    }

    // Calculate net salary
    public function calculateNetSalary(): float
    {
        return $this->basic_salary + $this->allowances + $this->overtime_pay - $this->deductions - $this->tax_deduction;
    }
}
