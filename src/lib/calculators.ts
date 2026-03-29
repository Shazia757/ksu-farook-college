export const CALCULATORS: Record<string, any> = {

    "ba-arabic": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Part II Arabic × 2", value: data.marks.secondLanguage * 2, type: "bonus" },
            { label: "History Bonus", value: data.studiedHistory === "yes" ? 50 : 0, type: "bonus" },
            { label: "Optional Arabic Bonus", value: data.studiedArabicOptional === "yes" ? 20 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },

    "ba-english": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "English x 2", value: data.marks.english * 2, type: "bonus" },
            { label: "Optional English Bonus", value: data.studiedEnglishOptional === "yes" ? 20 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "ba-malayalam": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Optional Languages Bonus", value: data.marks.secondLanguage * 2, type: "bonus" },
            { label: "Optional Malayalam Bonus", value: data.studiedMalayalamOptional === "yes" ? 20 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }

        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "ba-econ-soc": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Optional Economics Bonus", value: data.studiedOptional === "yes" ? 50 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }

        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "ba-multimedia": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Optional Multimedia Bonus", value: data.studiedMultimedia === "yes" ? 50 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }

        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },

    "bcom": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Commerce Bonus", value: data.commercePapers === "2 or more papers" ? 50 : data.commercePapers === "1 paper" ? 25 : 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bba": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bsc-core": (data: any) => {
        const breakdown = [
            { label: "Part III Marks", value: data.partIIITotal, type: "base" },
            { label: "Botany/Chemistry/Maths/Physics/Zoology Marks", value: Number(data.coreSubjectMarks), type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bsc-cs": (data: any) => {
        const maths = Number(data.mathsMarks) || 0;
        const cs = Number(data.csMarks) || 0;
        const higherMark = Math.max(maths, cs);
        const breakdown = [
            { label: "Part III Marks", value: data.partIIITotal, type: "base" },
            { label: "Higher of Maths / CS", value: higherMark, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bsc-psych": (data: any) => {
        const breakdown = [
            { label: "Total 12th Marks", value: data.total12th, type: "base" },
            { label: "Psychology marks", value: Number(data.psychologyMarks) * 0.15 || 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "msc-geology": (data: any) => {
        const breakdown = [
            { label: "Part III Marks", value: data.partIIITotal, type: "base" },
            { label: "Highest science mark", value: Number(data.scienceHighest) || 0, type: "bonus" },
            { label: "Geology mark", value: Number(data.geologyMarks) || 0, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bvoc-sd": (data: any) => {
        const maths = Number(data.mathsMarks) || 0;
        const cs = Number(data.csMarks) || 0;
        const higherMark = Math.max(maths, cs);
        const breakdown = [
            { label: "Part III Marks", value: data.partIIITotal, type: "base" },
            { label: "Maths/CS marks", value: higherMark, type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" },
            { label: "Optional VHSE bonus", value: data.isVHS === "yes" ? 25 : 0, type: "bonus" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },
    "bvoc-auto": (data: any) => {
        const breakdown = [
            { label: "Part III Marks", value: data.partIIITotal, type: "base" },

            { label: "Maths marks", value: Number(data.mathsMarks), type: "bonus" },
            { label: "Grace Marks", value: data.graceMarks, type: "grace" }
        ];

        const finalIndex = breakdown.reduce((sum, i) => sum + i.value, 0);

        return { breakdown, finalIndex };
    },

};