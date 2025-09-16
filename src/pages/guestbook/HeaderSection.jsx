import React from "react";
import CommonHeaderSection from "../../components/common/HeaderSection";

const HeaderSection = React.memo(function HeaderSection({ editMode, username }) {
    return (
        <CommonHeaderSection
            title="피드백 남기기"
            editMode={editMode}
            username={username}
            actionRoute="/guestbook/insert"
        />
    );
});

export default HeaderSection;
