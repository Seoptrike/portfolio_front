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
    <Box sx={{ padding: 4 }}>
      {/* 경력 섹션 */}
      <Box className="section-header" sx={{ display: 'flex', justifyContent: isAdmin ? 'space-between' : 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">경력 사항</Typography>
        {isAdmin && <Button variant="outlined" size="small">+ 추가</Button>}
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>근무처</TableCell>
              <TableCell>직급</TableCell>
              <TableCell colSpan={3}>근무 기간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careers.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 학력 섹션 */}
      <Box className="section-header" sx={{ display: 'flex', justifyContent: isAdmin ? 'space-between' : 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">학력 사항</Typography>
        {isAdmin && <Button variant="outlined" size="small">+ 추가</Button>}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>학교</TableCell>
              <TableCell>전공</TableCell>
              <TableCell>재학 기간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.school}</TableCell>
                <TableCell>{item.major}</TableCell>
                <TableCell>{item.period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CareersPage
