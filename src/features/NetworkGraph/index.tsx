import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components";

interface Nodes {
  nodes: {
    id: string;
    source: string;
    url: string;
  }[];
  links: {
    source: string;
    target: string;
  };
}
interface Props{
  url: string;
}
const NetworkGraph = ({url}:Props) => {
  const svgRef = useRef(null);
  const [data, setData] = useState<Nodes>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async() => {
      var toSend = {
        content: "EMPTY",
        contentUri: url,
        language: "ron"
      }
      try{
        let response = await fetch("link", {
          body: JSON.stringify(toSend)
        })
        let respData= await response.json()
        setData(respData)
      }catch(err){
        setError("error fetching data for graph")
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="flex flex-col p-2 gap-3">
        <CardTitle className=" m-auto text-foreground w-fit text-[25px]">
          Sources network graph
        </CardTitle>
        <CardContent>
          <Loader subwaySurf={false} />
        </CardContent>
      </Card>
    );
  }
  if (error || !data?.nodes) {
    return (
      <Card className="flex flex-col p-2 gap-3">
        <CardTitle className=" m-auto text-foreground w-fit text-[25px]">
          Sources network graph
        </CardTitle>
        <CardContent>
          Error fetching data. Try Again Later
        </CardContent>
      </Card>
    );
  }
  useEffect(() => {
    /*const data = {
      nodes: [
        {
          id: "c9cb32d7b7c90b6className=" m-auto text-foreground w-fit text-[25px]"cea18b9c524526ec0",
          source: "origin node",
          url: "https://www.zdg.md/stiri/celula-de-criza-de-la-guvern-consumul-total-de-energie-electrica-pe-malul-drept-al-raului-nistru-pentru-25-ianuarie-s-a-estimat-a-fi-cu-circa-6-7-mai-mic-decat-in-zilele-precedente/",
        },
        {
          id: "dc4399b0a3be3be69e9f43dc6651887d",
          source: "NOI MD ron",
          url: "https://noi.md/md/economie/care-este-pretul-mediu-de-achizitie-a-energiei-electrice-prognozat-pentru-ziua-de-25-ianuarie",
        },
        {
          id: "e2cea72c92ea986bb0de83c684c2664f",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/024f8b81480c0999/consumul-de-energie-electrica-acoperit-integral-pentru-astazi-oamenii-sunt-indemnati-sa-economiseasca-curentul.html",
        },
        {
          id: "be491b33e4631467bef6dcbf12050305",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/consumul-de-energie-electrica-acoperit-integral-pe-24-ianuarie-anunta-celula-de-criza-a-guvernului",
        },
        {
          id: "36479a1999e3294548591ca8aed67a4b",
          source: "JurnalTV",
          url: "https://www.jurnaltv.md/news/60186e61715d1835/consumul-de-energie-este-acoperit-integral-astazi-pentru-malul-drept-al-raului-nistrului.html",
        },
        {
          id: "3d3f3ee498a06bfd198e7726d14a7cb8",
          source: "Radio Chișinău",
          url: "https://radiochisinau.md/pe-25-ianuarie-energocom-prognozeaza-un-consum-de-energie-electrica-cu-7prc-mai-mic-decat-astazi---206068.html",
        },
        {
          id: "1bc376f800aa1dee95f068d66b8d5d9e",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/46fb6161a1e41971/energocom-consumul-de-curent-prognozat-pentru-sambata-in-scadere.html",
        },
        {
          id: "bc34cccff547d2c7c21d50bb0b29dc22",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/43096a03d608384c/peste-60-din-necesarul-energetic-pentru-astazi-importat-din-romania-raportul-celulei-de-criza-a-guvernului.html",
        },
        {
          id: "8a4083e8a0faf022e413582f4e49f548",
          source: "Știri pe Surse",
          url: "https://www.stiripesurse.ro/chisinaul-a-achizitionat-o-cantitate-record-de-energie-electrica-de-pe-piata-din-romania-peste-65prc--din-curentul-consumat-de-republica-moldova-vine-din-romania_3560167.html",
        },
        {
          id: "9ecd5e75b6df492be52bf4f36b231184",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/cum-va-fi-acoperit-consumul-de-energie-electrica-pentru-astazi",
        },
        {
          id: "d5af9f884d14606afd73e6c6abd69028",
          source: "Vocea Basarabiei",
          url: "https://voceabasarabiei.md/prognoza-pentru-25-ianuarie-consumul-de-energie-electrica-pe-malul-drept-al-nistrului-va-scadea-cu-7/",
        },
        {
          id: "bc34cccff547d2c7c21d50bb0b29dc22",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/43096a03d608384c/peste-60-din-necesarul-energetic-pentru-astazi-importat-din-romania-raportul-celulei-de-criza-a-guvernului.html",
        },
        {
          id: "e2cea72c92ea986bb0de83c684c2664f",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/024f8b81480c0999/consumul-de-energie-electrica-acoperit-integral-pentru-astazi-oamenii-sunt-indemnati-sa-economiseasca-curentul.html",
        },
        {
          id: "be491b33e4631467bef6dcbf12050305",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/consumul-de-energie-electrica-acoperit-integral-pe-24-ianuarie-anunta-celula-de-criza-a-guvernului",
        },
        {
          id: "8a4083e8a0faf022e413582f4e49f548",
          source: "Știri pe Surse",
          url: "https://www.stiripesurse.ro/chisinaul-a-achizitionat-o-cantitate-record-de-energie-electrica-de-pe-piata-din-romania-peste-65prc--din-curentul-consumat-de-republica-moldova-vine-din-romania_3560167.html",
        },
        {
          id: "8a4083e8a0faf022e413582f4e49f548",
          source: "Știri pe Surse",
          url: "https://www.stiripesurse.ro/chisinaul-a-achizitionat-o-cantitate-record-de-energie-electrica-de-pe-piata-din-romania-peste-65prc--din-curentul-consumat-de-republica-moldova-vine-din-romania_3560167.html",
        },
        {
          id: "8a4083e8a0faf022e413582f4e49f548",
          source: "Știri pe Surse",
          url: "https://www.stiripesurse.ro/chisinaul-a-achizitionat-o-cantitate-record-de-energie-electrica-de-pe-piata-din-romania-peste-65prc--din-curentul-consumat-de-republica-moldova-vine-din-romania_3560167.html",
        },
        {
          id: "3d3f3ee498a06bfd198e7726d14a7cb8",
          source: "Radio Chișinău",
          url: "https://radiochisinau.md/pe-25-ianuarie-energocom-prognozeaza-un-consum-de-energie-electrica-cu-7prc-mai-mic-decat-astazi---206068.html",
        },
        {
          id: "9ecd5e75b6df492be52bf4f36b231184",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/cum-va-fi-acoperit-consumul-de-energie-electrica-pentru-astazi",
        },
        {
          id: "e2cea72c92ea986bb0de83c684c2664f",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/024f8b81480c0999/consumul-de-energie-electrica-acoperit-integral-pentru-astazi-oamenii-sunt-indemnati-sa-economiseasca-curentul.html",
        },
        {
          id: "be491b33e4631467bef6dcbf12050305",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/consumul-de-energie-electrica-acoperit-integral-pe-24-ianuarie-anunta-celula-de-criza-a-guvernului",
        },
        {
          id: "9ecd5e75b6df492be52bf4f36b231184",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/cum-va-fi-acoperit-consumul-de-energie-electrica-pentru-astazi",
        },
        {
          id: "d5af9f884d14606afd73e6c6abd69028",
          source: "Vocea Basarabiei",
          url: "https://voceabasarabiei.md/prognoza-pentru-25-ianuarie-consumul-de-energie-electrica-pe-malul-drept-al-nistrului-va-scadea-cu-7/",
        },
        {
          id: "e2cea72c92ea986bb0de83c684c2664f",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/024f8b81480c0999/consumul-de-energie-electrica-acoperit-integral-pentru-astazi-oamenii-sunt-indemnati-sa-economiseasca-curentul.html",
        },
        {
          id: "e2cea72c92ea986bb0de83c684c2664f",
          source: "Jurnal MD",
          url: "https://www.jurnal.md/ro/news/024f8b81480c0999/consumul-de-energie-electrica-acoperit-integral-pentru-astazi-oamenii-sunt-indemnati-sa-economiseasca-curentul.html",
        },
        {
          id: "3ea49c875171bb9902f9c5dc4f8c767d",
          source: "Jurnal.md",
          url: "https://www.jurnal.md/ro/category/economic",
        },
        {
          id: "8a4083e8a0faf022e413582f4e49f548",
          source: "Știri pe Surse",
          url: "https://www.stiripesurse.ro/chisinaul-a-achizitionat-o-cantitate-record-de-energie-electrica-de-pe-piata-din-romania-peste-65prc--din-curentul-consumat-de-republica-moldova-vine-din-romania_3560167.html",
        },
        {
          id: "9ecd5e75b6df492be52bf4f36b231184",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/cum-va-fi-acoperit-consumul-de-energie-electrica-pentru-astazi",
        },
        {
          id: "be491b33e4631467bef6dcbf12050305",
          source: "NOI MD ron",
          url: "https://noi.md/md/societate/consumul-de-energie-electrica-acoperit-integral-pe-24-ianuarie-anunta-celula-de-criza-a-guvernului",
        },
        {
          id: "3d3f3ee498a06bfd198e7726d14a7cb8",
          source: "Radio Chișinău",
          url: "https://radiochisinau.md/pe-25-ianuarie-energocom-prognozeaza-un-consum-de-energie-electrica-cu-7prc-mai-mic-decat-astazi---206068.html",
        },
      ],
      links: [
        {
          source: "dc4399b0a3be3be69e9f43dc6651887d",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "e2cea72c92ea986bb0de83c684c2664f",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "be491b33e4631467bef6dcbf12050305",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "36479a1999e3294548591ca8aed67a4b",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "3d3f3ee498a06bfd198e7726d14a7cb8",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "1bc376f800aa1dee95f068d66b8d5d9e",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "bc34cccff547d2c7c21d50bb0b29dc22",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "8a4083e8a0faf022e413582f4e49f548",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "9ecd5e75b6df492be52bf4f36b231184",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "d5af9f884d14606afd73e6c6abd69028",
          target: "c9cb32d7b7c90b6cea18b9c524526ec0",
        },
        {
          source: "bc34cccff547d2c7c21d50bb0b29dc22",
          target: "dc4399b0a3be3be69e9f43dc6651887d",
        },
        {
          source: "e2cea72c92ea986bb0de83c684c2664f",
          target: "9ecd5e75b6df492be52bf4f36b231184",
        },
        {
          source: "be491b33e4631467bef6dcbf12050305",
          target: "1bc376f800aa1dee95f068d66b8d5d9e",
        },
        {
          source: "8a4083e8a0faf022e413582f4e49f548",
          target: "1bc376f800aa1dee95f068d66b8d5d9e",
        },
        {
          source: "8a4083e8a0faf022e413582f4e49f548",
          target: "3d3f3ee498a06bfd198e7726d14a7cb8",
        },
        {
          source: "8a4083e8a0faf022e413582f4e49f548",
          target: "9ecd5e75b6df492be52bf4f36b231184",
        },
        {
          source: "3d3f3ee498a06bfd198e7726d14a7cb8",
          target: "1bc376f800aa1dee95f068d66b8d5d9e",
        },
        {
          source: "9ecd5e75b6df492be52bf4f36b231184",
          target: "d5af9f884d14606afd73e6c6abd69028",
        },
        {
          source: "e2cea72c92ea986bb0de83c684c2664f",
          target: "d5af9f884d14606afd73e6c6abd69028",
        },
        {
          source: "be491b33e4631467bef6dcbf12050305",
          target: "d5af9f884d14606afd73e6c6abd69028",
        },
        {
          source: "9ecd5e75b6df492be52bf4f36b231184",
          target: "1bc376f800aa1dee95f068d66b8d5d9e",
        },
        {
          source: "d5af9f884d14606afd73e6c6abd69028",
          target: "1bc376f800aa1dee95f068d66b8d5d9e",
        },
        {
          source: "e2cea72c92ea986bb0de83c684c2664f",
          target: "be491b33e4631467bef6dcbf12050305",
        },
        {
          source: "e2cea72c92ea986bb0de83c684c2664f",
          target: "3d3f3ee498a06bfd198e7726d14a7cb8",
        },
        {
          source: "3ea49c875171bb9902f9c5dc4f8c767d",
          target: "bc34cccff547d2c7c21d50bb0b29dc22",
        },
        {
          source: "8a4083e8a0faf022e413582f4e49f548",
          target: "be491b33e4631467bef6dcbf12050305",
        },
        {
          source: "9ecd5e75b6df492be52bf4f36b231184",
          target: "3d3f3ee498a06bfd198e7726d14a7cb8",
        },
        {
          source: "be491b33e4631467bef6dcbf12050305",
          target: "3d3f3ee498a06bfd198e7726d14a7cb8",
        },
        {
          source: "3d3f3ee498a06bfd198e7726d14a7cb8",
          target: "d5af9f884d14606afd73e6c6abd69028",
        },
      ],
    };*/

    const width = 800;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "none")
      .call(
        d3.zoom().on("zoom", (event: any) => {
          svgGroup.attr("transform", event.transform);
        }),
      );

    const svgGroup = svg.append("g");

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d: any) => d.id)
          .distance(200),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svgGroup
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const node = svgGroup
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g")
      .on("click", (_: any, d: any) => {
        window.open(d.url, "_blank");
      });

    node
      .append("circle")
      .attr("r", (_: any, i: any) => (i === 0 ? 15 : 10))
      .attr("fill", (_: any, i: any) => (i === 0 ? "green" : "lightblue"))
      .call(
        d3
          .drag()
          .on("start", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event: any, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    node
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d: any) => d.source);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <Card className="flex flex-col p-2 gap-3">
      <CardTitle className=" m-auto text-foreground w-fit text-[25px]">
        Sources network graph
      </CardTitle>
      <CardContent>
        <svg ref={svgRef}></svg>
      </CardContent>
    </Card>
  );
};
export default NetworkGraph;
