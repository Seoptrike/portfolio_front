import React from "react";
import CommonHeaderSection from "../../components/common/HeaderSection";

const HeaderSection = React.memo(function HeaderSection({ editMode, username }) {
    return (
        <CommonHeaderSection 
            title="자기소개서"
            editMode={editMode}
            username={username}
            actionRoute="/aboutme/insert"
        />
    );
});

export default HeaderSection;
