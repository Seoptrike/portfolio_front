import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, Box
} from '@mui/material'

const CareersPage = () => {
  const isAdmin = false

  const careers = [
    { company: '넷컴솔루션', position: '사원', period: '2023.01' }
  ]

  const education = [
    { school: '한국방송통신대학교', major: '컴퓨터과학과', period: '2024.03 ~ 재학중' },
  ]

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
      {/* 경력 섹션 */}
      <Box
        className="section-header"
        sx={{
          display: 'flex',
          justifyContent: isAdmin ? 'space-between' : 'center',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            fontWeight: 'bold'
          }}
        >
          경력 사항
        </Typography>
        {isAdmin && (
          <Button
            variant="outlined"
            size="small"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, py: 0.5 }}
          >
            + 추가
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}>근무처</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}>직급</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }} colSpan={3}>근무 기간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careers.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.company}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.position}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 학력 섹션 */}
      <Box
        className="section-header"
        sx={{
          display: 'flex',
          justifyContent: isAdmin ? 'space-between' : 'center',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            fontWeight: 'bold'
          }}
        >
          학력 사항
        </Typography>
        {isAdmin && (
          <Button
            variant="outlined"
            size="small"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, py: 0.5 }}
          >
            + 추가
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}>학교</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}>전공</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}>재학 기간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.school}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.major}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{item.period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CareersPage
