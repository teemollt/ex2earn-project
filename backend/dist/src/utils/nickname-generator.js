"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNickname = generateRandomNickname;
function generateRandomNickname() {
    const adjectives = [
        '스쿼트', '데드리프트', '벤치프레스', '버피', '철봉', '푸쉬업',
        '팔굽혀펴기', '런지', '플랭크', '사이드레그레이즈', '힙쓰러스트',
    ];
    const nouns = [
        '마스터', '요정', '고수', '대장', '왕', '전문가', '챔피언',
        '레전드', '신', '파괴자', '광인', '근돼', '짐승', '기린',
    ];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}`;
}
//# sourceMappingURL=nickname-generator.js.map