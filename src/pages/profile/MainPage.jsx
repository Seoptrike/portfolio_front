import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserTotalData } from '../../api/userApi';
import useEditMode from '../../hooks/useEditMode';
import useIsMobile from '../../hooks/useIsMobile';
import MobileMainLayout from './MobileMainLayout';
import DesktopMainLayout from './DesktopMainLayout';
import ScrollableMainLayout from './ScrollableMainLayout';
const MainPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const [userProject, setUserProject] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { editMode } = useEditMode();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const isMobile = useIsMobile();

    const CallTotalAPI = async () => {
        const startTime = performance.now();
        console.log(`🚀 ${username} 페이지 데이터 로딩 시작... (시작시간: ${startTime})`);

        try {
            console.log(`📞 getUserTotalData 호출 직전: ${(performance.now() - startTime).toFixed(2)}ms`);

            // HTTP 연결 경합 방지를 위한 최소 지연 (75ms)
            await new Promise(resolve => setTimeout(resolve, 75));

            // 정확한 측정을 위해 직접 측정
            const apiStart = performance.now();
            const res = await getUserTotalData(username);
            const apiEnd = performance.now();

            const apiTime = performance.now();
            console.log(`📡 API 호출 완료: ${(apiTime - startTime).toFixed(2)}ms`);
            console.log(`🎯 순수 API 시간 (직접 측정): ${(apiEnd - apiStart).toFixed(2)}ms`);
            console.log(`⏰ API 호출 전 지연시간: ${(apiStart - startTime).toFixed(2)}ms`);
            console.log(`🔍 응답 데이터 크기: ${JSON.stringify(res.data).length} bytes`);

            if (res.data.userID === "NONE") {
                navigate('/notfound');
                return;
            }

            console.log(`⚙️ setState 시작: ${(performance.now() - startTime).toFixed(2)}ms`);
            setUserCareers(res.data);
            setUserID(res.data.userID);
            setUserProject(res.data.projects);
            setUserInfo(res.data.userInfo);

            // setState는 동기적이므로 대기 불필요

            const endTime = performance.now();
            console.log(`✅ ${username} 페이지 로딩 완료: ${(endTime - startTime).toFixed(2)}ms`);
        } catch (error) {
            console.error('❌ API 호출 실패:', error);
        }
    };
    useEffect(() => {
        // 브라우저 성능 정보 출력
        if (performance.navigation) {
            console.log(`🌐 페이지 로드 타입: ${performance.navigation.type === 1 ? 'F5 새로고침' : '일반 로드'}`);
        }

        CallTotalAPI();
    }, [username])
    const commonProps = {
        userID,
        username,
        userCareers,
        userProject,
        userInfo,
        editMode,
        showProfileModal,
        setShowProfileModal,
        CallTotalAPI
    };

    return isMobile ?
        <MobileMainLayout {...commonProps} /> :
        <ScrollableMainLayout {...commonProps} />
}
export default MainPage