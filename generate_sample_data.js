// サンプルデータ生成用の関数
function generateSampleData(count) {
    const data = [];
    const problems = [
        "高血圧",
        "2型糖尿病",
        "脂質異常症",
        "慢性腎臓病",
        "心不全",
        "COPD",
        "喘息",
        "関節リウマチ",
        "骨粗鬆症",
        "甲状腺機能低下症"
    ];
    
    const treatments = [
        "生活習慣指導",
        "薬剤調整",
        "運動療法",
        "食事指導",
        "定期フォロー",
        "検査実施",
        "リハビリテーション",
        "ワクチン接種",
        "栄養指導",
        "睡眠指導"
    ];

    // 現在の日付から過去1年分の日付を生成
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    for (let i = 0; i < count; i++) {
        // ランダムな日付を生成（過去1年以内）
        const randomDate = new Date(oneYearAgo.getTime() + Math.random() * (today.getTime() - oneYearAgo.getTime()));
        const visitDate = randomDate.toISOString().split('T')[0];

        // ランダムな問題と治療を選択
        const problemCount = Math.floor(Math.random() * 3) + 1; // 1-3個の問題
        const treatmentCount = Math.floor(Math.random() * 3) + 1; // 1-3個の治療
        const selectedProblems = [];
        const selectedTreatments = [];

        for (let j = 0; j < problemCount; j++) {
            const randomProblem = problems[Math.floor(Math.random() * problems.length)];
            if (!selectedProblems.includes(randomProblem)) {
                selectedProblems.push(randomProblem);
            }
        }

        for (let j = 0; j < treatmentCount; j++) {
            const randomTreatment = treatments[Math.floor(Math.random() * treatments.length)];
            if (!selectedTreatments.includes(randomTreatment)) {
                selectedTreatments.push(randomTreatment);
            }
        }

        const record = {
            id: `P${String(i + 1).padStart(6, '0')}`,
            patientId: `P${String(i + 1).padStart(6, '0')}`,
            patientName: `患者${i + 1}`,
            visitDate: visitDate,
            problem: selectedProblems.join('\n'),
            treatment: selectedTreatments.join('\n')
        };

        data.push(record);
    }

    return data;
}

// CSVデータを生成
function generateCSV(data) {
    const headers = ['ID', '患者ID', '患者氏名', '診療日', 'Problem list', '診察治療'];
    const csvRows = [
        headers.join(','),
        ...data.map(record => {
            const fields = [
                record.id,
                record.patientId,
                record.patientName,
                record.visitDate,
                record.problem,
                record.treatment
            ].map(field => {
                const escaped = String(field)
                    .replace(/"/g, '""')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r');
                return `"${escaped}"`;
            });
            return fields.join(',');
        })
    ].join('\n');

    return '\ufeff' + csvRows; // BOMを追加
}

// 500件のサンプルデータを生成
const sampleData = generateSampleData(500);
const csv = generateCSV(sampleData);

// ファイルをダウンロード
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'sample_medical_records.csv';
link.click();
URL.revokeObjectURL(link.href); 