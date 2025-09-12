import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserTotalData } from '../../api/userApi';
import useEditMode from '../../hooks/useEditMode';
import useIsMobile from '../../hooks/useIsMobile';
import { useLoading } from '../../context/LoadingContext';
import MobileMainLayout from './MobileMainLayout';
import DesktopMainLayout from './DesktopMainLayout';
import ScrollableMainLayout from './ScrollableMainLayout';
const MainPage = () => {
    const { username } = useParams();
    const { withLoading } = useLoading();
    const navigate = useNavigate();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const [userProject, setUserProject] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { editMode } = useEditMode();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const isMobile = useIsMobile();

    const CallTotalAPI = withLoading(async () => {
        const res = await getUserTotalData(username)
        if (res.data.userID === "NONE") {
            navigate('/notfound');
            return;
        }
        setUserCareers(res.data);
        setUserID(res.data.userID);
        setUserProject(res.data.projects)
        setUserInfo(res.data.userInfo);
    });
    useEffect(() => { CallTotalAPI() }, [username])
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