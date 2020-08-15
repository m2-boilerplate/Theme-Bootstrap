<?php
/**
 * Extension.php
 *
 * @category    Leonex
 * @package     ???
 * @author      Thomas Hampe <hampe@leonex.de>
 * @copyright   Copyright (c) 2020, LEONEX Internet GmbH
 */


namespace M2Boilerplate\Bootstrap\Twig;


use M2Boilerplate\Bootstrap\Service\BootstrapIcon;
use Twig\Extension\AbstractExtension;

class Extension extends AbstractExtension
{

    /**
     * @var BootstrapIcon
     */
    protected $bootstrapIcon;

    public function __construct(BootstrapIcon $bootstrapIcon)
    {
        $this->bootstrapIcon = $bootstrapIcon;
    }

    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('bs_icon', [$this->bootstrapIcon, 'getBootstrapIconSvg'], ['is_safe' => ['html']])
        ];
    }

}