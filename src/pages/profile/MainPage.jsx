import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserTotalData } from '../../api/userApi';
import useEditMode from '../../hooks/useEditMode';
import useIsMobile from '../../hooks/useIsMobile';
import MobileMainLayout from './MobileMainLayout';
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
        try {
            const res = await getUserTotalData(username);

            if (res.data.userID === "NONE") {
                navigate('/notfound');
                return;
            }

            setUserCareers(res.data);
            setUserID(res.data.userID);
            setUserProject(res.data.projects);
            setUserInfo(res.data.userInfo);
        } catch (error) {
            console.error('API 호출 실패:', error);
        }
    };
    useEffect(() => {
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