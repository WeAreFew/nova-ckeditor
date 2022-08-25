<?php

namespace Mostafaznv\NovaCkEditor;

use Laravel\Nova\Nova;
use Illuminate\Support\Facades\App;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\ServiceProvider;

class FieldServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        if (!$this->app->bound('ckeditor-image-storage')) {
            $this->app->bind('ckeditor-image-storage', ImageStorage::class);
        }

        if ($this->app->runningInConsole()) {
            $this->publish();
        }

        $this->mergeConfigFrom(__DIR__ . '/../config/nova-ckeditor.php', 'nova-ckeditor');
    }

    public function boot(): void
    {
        Nova::serving(function(ServingNova $event) {
            Nova::provideToScript(['ckeditor' => config('nova-ckeditor', [])]);
            Nova::style('field-ckeditor', __DIR__ . '/../dist/css/field.css');

            // allow hot reloading
            if (App::environment('local') && file_exists(__DIR__ . '/../dist/hot')) {
                Nova::remoteScript('http://localhost:8080/js/field.js');
            }
            else {
                Nova::script('field-ckeditor', __DIR__ . '/../dist/js/field.js');
            }
        });
    }

    protected function publish(): void
    {
        $this->publishes([
            __DIR__ . '/../config/nova-ckeditor.php' => config_path('nova-ckeditor.php')
        ], 'nova-ckeditor-config');

        $this->publishes([
            # routes
            // __DIR__ . '/../stubs/routes/ckeditor.stub' => base_path('routes/web/ckeditor.php'),

            # views
            __DIR__ . '/../stubs/views' => resource_path('views/ckeditor'),

            # migrations
            __DIR__ . '/../stubs/migrations/2021_01_01_000000_create_images_table.stub' => database_path('migrations/2021_01_01_000000_create_images_table.php'),
            __DIR__ . '/../stubs/migrations/2021_01_01_000000_create_videos_table.stub' => database_path('migrations/2021_01_01_000000_create_videos_table.php'),
            __DIR__ . '/../stubs/migrations/2022_08_17_000000_create_ck_comments_table.stub' => database_path('migrations/2022_08_17_000000_create_ck_comments_table.php'),
            __DIR__ . '/../stubs/migrations/2022_08_17_000000_create_ck_suggestions_table.stub' => database_path('migrations/2022_08_17_000000_create_ck_suggestions_table.php'),
            __DIR__ . '/../stubs/migrations/2022_08_22_000000_create_ck_revisions_table.stub' => database_path('migrations/2022_08_22_000000_create_ck_revisions_table.php'),

            # models
            __DIR__ . '/../stubs/models/Image.stub' => app_path('Models/Image.php'),
            __DIR__ . '/../stubs/models/Video.stub' => app_path('Models/Video.php'),
            __DIR__ . '/../stubs/models/CkComment.stub' => app_path('Models/CkComment.php'),
            __DIR__ . '/../stubs/models/CkSuggestion.stub' => app_path('Models/CkSuggestion.php'),
            __DIR__ . '/../stubs/models/CkRevision.stub' => app_path('Models/CkRevision.php'),
            
            # controllers
            __DIR__ . '/../stubs/controllers/CkCommentController.stub' => app_path('Http/Controllers/CkCommentController.php'),
            __DIR__ . '/../stubs/controllers/CkSuggestionController.stub' => app_path('Http/Controllers/CkSuggestionController.php'),
            __DIR__ . '/../stubs/controllers/CkRevisionController.stub' => app_path('Http/Controllers/CkRevisionController.php'),
            
            # resources
            __DIR__ . '/../stubs/resources/Image.stub' => app_path('Nova/Resources/Image.php'),
            __DIR__ . '/../stubs/resources/Video.stub' => app_path('Nova/Resources/Video.php')
        ], 'nova-ckeditor-stubs');
    }
}
