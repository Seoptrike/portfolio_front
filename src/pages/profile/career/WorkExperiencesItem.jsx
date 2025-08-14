import React from "react";
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from '../../../utils/yearModule';
import { insertWorkExp, updateWorkExp, deleteWorkExp } from '../../../api/careerApi';
import CommonCareerPage from "./CommonCareerPage";

const WorkExperiencesItem = ({ userID, username, data = [], onSuccess }) => {
   const idKey = "workId";

    return (
        <CommonCareerPage
            title="경력사항"
            rows={data}
            idKey={idKey}
            username={username}
            headers={{ col1: "회사", col2: "직무", period: "재직 기간" }}
            pickCol1={(r) => r.companyName}
            pickCol2={(r) => r.position}
            pickStart={(r) => r.startDate}
            pickEnd={(r) => r.endDate}
            mapRowToForm={(r) => ({
                title1: r.col1 ?? r.companyName ?? "",
                title2: r.col2 ?? r.position ?? "",
                startDate: r.startDate ?? "",
                endDate: r.endDate ?? "",
            })}
            mapFormToPayload={(form, usernameArg) => ({
                userId: userID,
                username: usernameArg,
                companyName: form.title1,
                position: form.title2,
                ...formToApiDates(form),
            })}
            createFn={insertWorkExp}
            updateFn={updateWorkExp}
            deleteFn={deleteWorkExp}
            onSuccess={onSuccess}
            modalLabels={{
                title1: "회사",
                title2: "직무",
                startLabel: "입사(년-월)",
                endLabel: "퇴사(년-월)",
                editTitle: "경력 수정",
                addTitle: "경력 추가",
                save: "저장",
                update: "수정",
                delete: "삭제",
                cancel: "취소",
                guide: "재직 기간은 월까지 입력해 주세요.",
            }}
        />
    );
};

export default WorkExperiencesItem