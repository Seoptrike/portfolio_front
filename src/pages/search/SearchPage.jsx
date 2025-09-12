import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { searchUsername } from "../../api/userApi";
import { Link } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await searchUsername(query);
        console.log("검색어:", query);
        setResults(res.data)
    };
    return (
        <div className="search-page">
            <div className="search-container">
                {/* 헤더 섹션 */}
                <div className="search-header">
                    <h1 className="search-title">🔍 개발자 찾기</h1>
                    <p className="search-subtitle">포트폴리오를 가진 개발자를 검색해보세요</p>
                </div>

                {/* 검색 영역 */}
                <div className="search-form-container">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-group">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="사용자명을 입력하세요 (예: kis, test)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit" className="search-btn-custom">
                                <span>검색</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* 결과 영역 */}
                <div className="search-results">
                    {results.length > 0 ? (
                        <div className="results-grid">
                            {results.map((user, idx) => (
                                <div key={idx} className="result-card">
                                    <div className="result-header">
                                        <h3 className="result-username">@{user.username}</h3>
                                        <span className="result-name">{user.name}</span>
                                    </div>
                                    <Link 
                                        to={`/${user.username}`}
                                        className="result-link"
                                    >
                                        포트폴리오 보러가기 →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : query && (
                        <div className="no-results">
                            <p>🤔 검색 결과가 없습니다</p>
                            <span>다른 사용자명으로 검색해보세요</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage