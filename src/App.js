import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';


import Category from './pages/Category';
import OrderPages from './pages/OrderPages';
import Products from './pages/Products';
import Login from './pages/Login';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';

const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [login, setLogin] = useState(true);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
  
    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
            }]
        },

        // {
        //     label: 'UI Components', icon: 'pi pi-fw pi-sitemap',
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
        //         { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
        //         { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
        //         { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
        //     ]
        // },
        // {
        //     label: 'UI Blocks',
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: "NEW" },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-react' }
        //     ]
        // },
        // {
        //     label: 'Icons',
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons' }
        //     ]
        // },
        {
            label: 'Sayfalar', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Sipariş İşlemleri', icon: 'pi pi-fw pi-shopping-bag', to: '/order' },
                { label: 'Ürün İşlemleri', icon: 'pi pi-fw pi-shopping-bag', to: '/products' },
                { label: 'Kategori İşlemleri', icon: 'pi pi-fw pi-user-edit', to: '/category' },


            ]
        },
        // {
        //     label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
        //     items: [
        //         {
        //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     items: [
        //         { label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => { window.location = "#/documentation" } },
        //         { label: 'View Source', icon: 'pi pi-fw pi-search', command: () => { window.location = "https://github.com/primefaces/sakai-react" } }
        //     ]
        // }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            {
                login ? (
                    <>
                        <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                            mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                    </>
                ) : (
                    <>
                    </>
                )
            }
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />


            {
                login ? (
                    <>
                        <div className="layout-sidebar" onClick={onSidebarClick}>
                            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                        </div>
                    </>
                ) : (
                    <>

                    </>
                )
            }


            <div className="layout-main-container">
                <div className="layout-main">
                    {
                        login ? (
                            <>
                            
                                <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />

                                <Route path="/order" component={OrderPages} />
                                <Route path="/category" component={Category} />
                                <Route path="/products" component={Products} />

                            </>
                        ) : (
                            <>
                                <Route path="/login" exact render={() => <Login colorMode={layoutColorMode} location={location} />} />


                            </>
                        )
                    }

                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
