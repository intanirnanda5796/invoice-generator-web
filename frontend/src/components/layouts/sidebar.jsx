import SidebarContent from "./sidebar-content";

const Sidebar = () => {
    return (
        <>
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    <SidebarContent />
                </div>

            </div>
        </>
    );
}

export default Sidebar;
