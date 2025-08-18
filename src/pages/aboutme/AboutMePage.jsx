import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useEditMode from '../../hooks/useEditMode';
import {
    fetchAboutList,
    insertAboutDetail,
    updateAboutDetail,
    deleteAboutDetail,
    createAbout,
} from '../../api/aboutApi';
import AboutCard from './AboutCard';
import AddCard from './AddCard';
import AddEditForm from './AddEditForm';

const AboutMePage = () => {
    const [aboutList, setAboutList] = useState([]);
    const { username } = useParams();
    const { editMode } = useEditMode();
    const { isHost } = useContext(AuthContext);
    const [about_id, setAbout_id] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState({ title: '', content: '' });
    const [newAbout, setNewAbout] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    const callAPI = async () => {
        try {
            const res = await fetchAboutList(username);
            const sortedData = [...res.data].sort((a, b) => a.sort - b.sort);
            setAboutList(sortedData);
            setAbout_id(res.data?.[0]?.about_id ?? null);
        } catch (e) {
            navigate('/notfound');
        }
    };

    useEffect(() => {
        callAPI();
    }, [username]);

    const handleAddClick = () => setIsAdding(true);
    const handleAddInputChange = (e) => setNewAbout((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleAddCancel = () => { setIsAdding(false); setNewAbout({ title: '', content: '' }); };
    const handleAddSave = async () => {
        try {
            if (about_id) {
                await insertAboutDetail({ ...newAbout, aboutId: about_id });
            } else {
                await createAbout({ username, title: newAbout.title, content: newAbout.content });
            }
            setNewAbout({ title: '', content: '' });
            setIsAdding(false);
            await callAPI();
        } catch (e) {
            console.error(e);
            alert('저장 실패');
        }
    };

    const startEdit = (about) => {
        setEditingId(about.detail_id);
        setEditingContent({ title: about.title, content: about.content });
    };
    const cancelEdit = () => { setEditingId(null); setEditingContent({ title: '', content: '' }); };
    const handleEditInputChange = (e) => setEditingContent((p) => ({ ...p, [e.target.name]: e.target.value }));
    const saveEdit = async (detail_id) => {
        try {
            await updateAboutDetail({ ...editingContent, detailId: detail_id });
            setEditingId(null);
            await callAPI();
        } catch (e) {
            console.error(e);
            alert('수정 실패');
        }
    };

    const removeDetail = async (detail_id) => {
        if (!window.confirm('정말로 이 항목을 삭제하시겠습니까?')) return;
        try {
            await deleteAboutDetail(detail_id);
            await callAPI();
        } catch (e) {
            console.error(e);
            alert('삭제 실패');
        }
    };

    const renderContent = () => {
        if (aboutList.length === 0) {
            return isHost ? (
                <Grid maxWidth={'false'}>
                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                        {isAdding ? (
                            <AddEditForm
                                mode="add"
                                values={newAbout}
                                onChange={handleAddInputChange}
                                onCancel={handleAddCancel}
                                onSave={handleAddSave}
                            />
                        ) : (
                            <AddCard onClick={handleAddClick} />
                        )}
                    </Grid>
                </Grid>
            ) : (
                <Typography color="text.secondary">작성된 자기소개가 없습니다.</Typography>
            );
        }

        return (
            <Stack spacing={2.5}>
                {aboutList.map((about) => (
                    <AboutCard
                        key={about.detail_id}
                        about={about}
                        editMode={editMode}
                        isEditing={editingId === about.detail_id}
                        editingValues={editingContent}
                        onStartEdit={() => startEdit(about)}
                        onChangeEdit={handleEditInputChange}
                        onCancelEdit={cancelEdit}
                        onSaveEdit={() => saveEdit(about.detail_id)}
                        onDelete={() => removeDetail(about.detail_id)}
                    />
                ))}
                {editMode && (
                    isAdding ? (
                        <AddEditForm
                            mode="add"
                            values={newAbout}
                            onChange={handleAddInputChange}
                            onCancel={handleAddCancel}
                            onSave={handleAddSave}
                        />
                    ) : (
                        <AddCard onClick={handleAddClick} />
                    )
                )}
            </Stack>
        );
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default AboutMePage;