<?php
/**
 * TwigObserver.php
 *
 * @category    Leonex
 * @package     ???
 * @author      Thomas Hampe <hampe@leonex.de>
 * @copyright   Copyright (c) 2020, LEONEX Internet GmbH
 */


namespace M2Boilerplate\Bootstrap\Observer;

use M2Boilerplate\Bootstrap\Service\TwigTemplateLocations;
use M2Boilerplate\Bootstrap\Twig\Extension;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Twig\Environment;

class TwigObserver implements ObserverInterface
{
    /**
     * @var Extension
     */
    protected $twigExtension;

    public function __construct(Extension $twigExtension)
    {
        $this->twigExtension = $twigExtension;
    }

    public function execute(Observer $observer)
    {
        $twig = $observer->getData('twig');
        if (!$twig instanceof Environment) {
            return;
        }
        $twig->addExtension($this->twigExtension);
    }

}