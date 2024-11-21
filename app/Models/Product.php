<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'price',
        'description',
        'title',
        'category',
        'quantity_in_stock',
        'product_image',
    ];

    /**
     * Get the encrypted ID.
     */
    public function getEncryptedIdAttribute()
    {
        return Crypt::encryptString($this->id);
    }

    /**
     * Decrypt the encrypted ID.
     */
    public static function decryptId($encryptedId)
    {
        return Crypt::decryptString($encryptedId);
    }
}
