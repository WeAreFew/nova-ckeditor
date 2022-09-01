<?php

namespace Mostafaznv\NovaCkEditor;

use Laravel\Nova\Fields\Expandable;
use Laravel\Nova\Fields\Field;
use Mostafaznv\Larupload\Traits\Larupload;
use Illuminate\Support\Facades\Storage;

class Media extends Field
{
    use Expandable;

    /**
     * The field's component
     *
     * @var string $component
     */
    public $component = 'media';

    /**
     * Indicates whether the video browser should be available
     *
     * @var bool $videoBrowser
     */
    public bool $videoBrowser;

    public function __construct($name, $attribute = null, callable $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $config = config('nova-ckeditor');

        $this->imageBrowser = $config['toolbar']['browser']['image'];
        $this->videoBrowser = $config['toolbar']['browser']['video'];
        $this->contentLanguage = $config['toolbar']['content-lang'];
    }

    /**
     * Set Content Language
     *
     * @param string $lang
     * @return $this
     */
    public function contentLanguage(string $lang): self
    {
        $this->contentLanguage = $lang;

        return $this;
    }

    /**
     * Enable/Disable Image Browser
     *
     * @param bool $enabled
     * @return $this
     */
    public function imageBrowser(bool $enabled = true): self
    {
        $this->imageBrowser = $enabled;

        return $this;
    }

    /**
     * Enable/Disable Video Browser
     *
     * @param bool $enabled
     * @return $this
     */
    public function videoBrowser(bool $enabled = true): self
    {
        $this->videoBrowser = $enabled;

        return $this;
    }

    /**
     * Prepare the element for JSON serialization
     *
     * @return array
     */
    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'imageBrowser'           => $this->imageBrowser,
            'videoBrowser'           => $this->videoBrowser,
            'contentLanguage'        => $this->contentLanguage,
            'shouldShow'             => $this->shouldBeExpanded(),
            'videoHasLaruploadTrait' => $this->hasLaruploadTrait('App\Models\Video'),
            'url' => $this->value ? Storage::disk('public')->url($this->value) : null,
        ]);
    }

    /**
     * Check if class has larupload trait
     *
     * @param string $class
     * @return bool
     */
    protected function hasLaruploadTrait(string $class): bool
    {
        return class_exists($class) and in_array(Larupload::class, class_uses($class));
    }
}
