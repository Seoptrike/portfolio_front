import React from "react";
import { formToApiDates } from "../../../utils/yearModule";
import { insertEduHistory, updateEduHistory, deleteEduHistory } from "../../../api/careerApi";
import CommonCareerPage from "./CommonCareerPage";

// rows[0]에서 id 키 자동 감지
const detectIdKey = (rows, candidates) =>
    (Array.isArray(rows) && rows.length > 0 &&
        candidates.find((k) => k in rows[0])) || candidates[0];

const EduHistoryItem = ({ userID, username, data = [], onSuccess }) => {
    const idKey = detectIdKey(data, ["educationId", "id"]);

    return (
        <CommonCareerPage
            title="학력사항"
            rows={data}
            idKey={idKey}
            username={username}
            headers={{ col1: "학교", col2: "전공", period: "재학 기간" }}
            pickCol1={(r) => r.schoolName}
            pickCol2={(r) => r.major}
            pickStart={(r) => r.startDate}
            pickEnd={(r) => r.endDate}
            mapRowToForm={(r) => ({
                title1: r.col1 ?? r.schoolName ?? "",
                title2: r.col2 ?? r.major ?? "",
                startDate: r.startDate ?? "",
                endDate: r.endDate ?? "",
            })}
            mapFormToPayload={(form, usernameArg) => ({
                userId: userID,             // 필요 없으면 API단에서 무시
                username: usernameArg,
                schoolName: form.title1,
                major: form.title2,
                ...formToApiDates(form),    // YYYY-MM -> YYYY-MM-DD
            })}
            createFn={insertEduHistory}
            updateFn={updateEduHistory}
            deleteFn={deleteEduHistory}
            onSuccess={onSuccess}
            modalLabels={{
                title1: "학교",
                title2: "전공",
                startLabel: "입학(년-월)",
                endLabel: "졸업(년-월)",
                editTitle: "학력 수정",
                addTitle: "학력 추가",
                save: "저장",
                update: "수정",
                delete: "삭제",
                cancel: "취소",
                guide: "재학 기간은 월까지 입력해 주세요.",
            }}
        />
    );
};


export default EduHistoryItem