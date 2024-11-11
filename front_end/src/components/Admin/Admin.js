import React, { useEffect, useRef } from 'react';
import "./Admin.css"; // تأكد من أنك قد قمت بإضافة الأنماط المناسبة هنا
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faUserTie, faLayerGroup, faStore, faUserPlus, faTableCellsRowUnlock, faClone, faBusinessTime, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const headerRef = useRef(null);
    const mainRef = useRef(null);
    const themeButtonRef = useRef(null);

    // وظيفة عرض/إخفاء السايدبار
    const showSidebar = () => {
        const sidebar = sidebarRef.current;
        const header = headerRef.current;
        const main = mainRef.current;

        if (sidebar && header && main) {
            sidebar.classList.toggle('show-sidebar');
            header.classList.toggle('left-pd'); // تأكد من وجود هذه الأنماط في CSS
            main.classList.toggle('left-pd'); // تأكد من وجود هذه الأنماط في CSS
        }
    };

    useEffect(() => {
        const toggle = toggleRef.current;

        if (toggle) {
            toggle.addEventListener('click', showSidebar);
        }

        return () => {
            if (toggle) {
                toggle.removeEventListener('click', showSidebar);
            }
        };
    }, []);

   
    const toggles = () => {
      document.body.classList.toggle("dark-theme");
     }

    return (
        <div>
            <header className="header" id="header" ref={headerRef}>
                <div className="header__container">
                    <a href="/" className="header__logo">
                        <span>Cloud</span>
                    </a>
                    <button className="header__toggle" id="header-toggle" ref={toggleRef}>
                        <FontAwesomeIcon icon={faBarsStaggered} />
                    </button>
                </div>
            </header>

            <nav className="sidebar" id="sidebar" ref={sidebarRef}>
                <div className="sidebar__container">
                    <div className="sidebar__user">
                        <div className="sidebar__img">
                            <img src="dfd" alt="image" />
                        </div>
                        <div className="sidebar__info">
                            <h3>Rix Methil</h3>
                            <span>rix123@email.com</span>
                        </div>
                    </div>

                    <div className="sidebar__content">
                        <h3 className="sidebar__title">MANAGE</h3>
                        <div className="sidebar__list">
                            <NavLink to="get_company" className="sidebar__link">
                                <FontAwesomeIcon icon={faShop} />
                                <span>All Company</span>
                            </NavLink>
                            <NavLink to="get_user" className="sidebar__link">
                                <FontAwesomeIcon icon={faUserTie} />
                                <span>All Users</span>
                            </NavLink>
                            <NavLink to="get_Categorey" className="sidebar__link">
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <span>All Category</span>
                            </NavLink>
                            <NavLink to="get_advertisements" className="sidebar__link">
                                <FontAwesomeIcon icon={faClone} />
                                <span>All Advertisements</span>
                            </NavLink>
                            <NavLink to="get_Company_requests" className="sidebar__link">
                                <FontAwesomeIcon icon={faBusinessTime} />
                                <span>All Company Requests</span>
                            </NavLink>
                            <NavLink to="create_company" className="sidebar__link">
                                <FontAwesomeIcon icon={faStore} />
                                <span>Create Company</span>
                            </NavLink>
                            <NavLink to="create_user" className="sidebar__link">
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span>Create User</span>
                            </NavLink>
                            <NavLink to="create_Categorey" className="sidebar__link">
                                <FontAwesomeIcon icon={faTableCellsRowUnlock} />
                                <span>Create Category</span>
                            </NavLink>
                        </div>

                        <h3 className="sidebar__title">SETTINGS</h3>
                        <div className="sidebar__list">
                            <a href="#" className="sidebar__link">
                                <i className="ri-settings-3-fill"></i>
                                <span>Settings</span>
                            </a>
                            <a href="#" className="sidebar__link">
                                <i className="ri-mail-unread-fill"></i>
                                <span>My Messages</span>
                            </a>
                            <a href="#" className="sidebar__link">
                                <i className="ri-notification-2-fill"></i>
                                <span>Notifications</span>
                            </a>
                        </div>
                    </div>

                    <div className="sidebar__actions">
                        < button className="sidebar__link" ref={themeButtonRef} onClick={toggles}>
                            <i className="ri-moon-clear-fill sidebar__theme"></i>
                            <span>Theme</span>
                        </button>
                        <button className="sidebar__link">
                            <i className="ri-logout-box-r-fill"></i>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="main containers" id="main" ref={mainRef}>
                <Outlet />
            </main>
        </div>
    );
}