<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Proposal
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property int $client_id
 * @property int $created_by
 * @property string $amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $valid_until
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereValidUntil($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereUpdatedAt($value)
 * @method static \Database\Factories\ProposalFactory factory(...$parameters)
 * 
 * @mixin \Eloquent
 */
class Proposal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'client_id',
        'created_by',
        'amount',
        'status',
        'valid_until',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'valid_until' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the client that owns the proposal.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the user who created the proposal.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}