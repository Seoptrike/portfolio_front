import React from "react";
import CommonHeaderSection from "../../components/common/HeaderSection";

const HeaderSection = React.memo(function HeaderSection({ editMode, username }) {
    return (
        <CommonHeaderSection 
            title="방명록"
            editMode={editMode}
            username={username}
            actionRoute="/project/insert"
        />
    );
});

export default HeaderSection;
