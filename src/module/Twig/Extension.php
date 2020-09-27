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
use Magento\Framework\Math\Random;
use Magento\Framework\View\Element\AbstractBlock;
use Twig\Extension\AbstractExtension;

class Extension extends AbstractExtension
{

    /**
     * @var BootstrapIcon
     */
    protected $bootstrapIcon;
    /**
     * @var Random
     */
    private $random;

    public function __construct(BootstrapIcon $bootstrapIcon, Random $random)
    {
        $this->bootstrapIcon = $bootstrapIcon;
        $this->random = $random;
    }

    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('bs_icon', [$this->bootstrapIcon, 'getBootstrapIconSvg'], ['is_safe' => ['html']]),
            new \Twig\TwigFunction('bs_random_hash', [$this->random, 'getUniqueHash']),
        ];
    }

}