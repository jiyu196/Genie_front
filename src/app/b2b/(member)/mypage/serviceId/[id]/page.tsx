// "use client";
//
// import { useParams } from "next/navigation";
// import { useQuery } from "@apollo/client";
// import Button from "@/components/b2b/Button";
// import { GET_WEBTOON_BY_ACCESS_ID} from "@/graphql/b2b/mypage/getWebtoonByAccessId";
//
// type WebtoonCut = {
//     imageUrl: string;
//     createdAt: string;
// };
//
// type WebtoonGroup = {
//     webtoonGroupId: string;
//     title: string;
//     createdAt: string;
//     cuts: WebtoonCut[];
// };
//
// export default function StudentWorksPage() {
//     const { accessId } = useParams<{ accessId: string }>();
//     const { id } = useParams(); // SAID 문자열이어야 함
//
//     const { data, loading } = useQuery(GET_WEBTOON_BY_ACCESS_ID, {
//         variables: {
//             accessId: id,
//             input: {
//                 page: 1,
//                 size: 20,
//             },
//         },
//         fetchPolicy: "no-cache",
//     });
//
//     if (loading) {
//         return <div className="p-10 text-gray-400">불러오는 중...</div>;
//     }
//
//     const works: WebtoonGroup[] =
//         data?.getWebtoonPageByAccessId?.content ?? [];
//
//     return (
//         <section className="max-w-[960px] ml-8 mt-7 space-y-6">
//             <h1 className="text-2xl font-bold text-[#19344e]">
//                 학생 생성 결과물
//             </h1>
//
//             {works.length === 0 && (
//                 <div className="text-gray-400 mt-10">
//                     생성된 웹툰이 없습니다.
//                 </div>
//             )}
//
//             {works.map((work) => (
//                 <div
//                     key={work.webtoonGroupId}
//                     className="bg-white rounded-xl border p-5"
//                 >
//                     <div className="flex justify-between items-center mb-4">
//                         <div className="font-semibold text-[#19344e]">
//                             {work.createdAt.slice(0, 10)} 생성
//                         </div>
//
//                         <Button size="sm" variant="secondary">
//                             상세 보기
//                         </Button>
//                     </div>
//
//                     <div className="grid grid-cols-4 gap-2">
//                         {work.cuts.slice(0, 4).map((cut, idx) => (
//                             <img
//                                 key={idx}
//                                 src={cut.imageUrl}
//                                 className="aspect-square rounded-md object-cover bg-gray-100"
//                                 alt="웹툰 컷"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </section>
//     );
// }
