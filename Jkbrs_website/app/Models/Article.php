<?php
namespace App\Models;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image_path',
        'description',
        'publish_date',
    ];


    public static function decrypt($encryptedId)
    {
        return Crypt::decrypt($encryptedId);
    }


}
