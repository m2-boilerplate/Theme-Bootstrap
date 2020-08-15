<?php

namespace M2Boilerplate\Bootstrap\Service;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\View\Asset\File;
use Magento\Framework\View\Asset\Repository;

class BootstrapIcon
{
    /**
     * @var Repository
     */
    protected $assetRepository;
    /**
     * @var string
     */
    protected $iconLocation;

    /**
     * @var File[]
     */
    protected $iconCache = [];

    public function __construct(
        Repository $assetRepository,
        string $iconLocation = 'images/bootstrap-icons'
    ) {

        $this->assetRepository = $assetRepository;
        $this->iconLocation = $iconLocation;
    }


    public function getBootstrapIconSvg(
        string $icon,
        ?string $size = null,
        ?string $cssClasses = null
    ): ?string {

        try {
            $file = $this->getFile($icon);
            $svg = $file->getContent();
            if ($size) {
                $svg = preg_replace("/(width|height)=\".*?\"/",'$1="'.$size.'"', $svg);
            }
            if ($cssClasses) {
                $svg = preg_replace("/(class)=\".*?\"/",'$1="'.$cssClasses.'"', $svg);
            }
            return $svg;
        }
        catch (LocalizedException $e) {
            return null;
        }
    }

    /**
     * @param $icon
     *
     * @return mixed
     * @throws LocalizedException
     */
    protected function getFile($icon): File
    {
        if (!isset($this->iconCache[$icon])) {
            $iconPath = sprintf('%s/%s.svg', $this->iconLocation, $icon);
            /** @var  $svg */
            $svg = $this->assetRepository->createAsset($iconPath);
            $this->iconCache[$icon] = $svg;
        }

        return $this->iconCache[$icon];
    }

}