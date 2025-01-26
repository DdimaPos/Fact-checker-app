/*import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components";
import { cn } from "@/lib/utils";

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
interface Props {
  url: string;
  className?: string;
}

const NetworkGraph = ({ url, className }: Props) => {
  const svgRef = useRef(null);
  const [data, setData] = useState<Nodes>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      let toSend = {
        content: "EMPTY",
        contentUri: url,
        language: "ron",
      };
      try {
        let response = await fetch("http://localhost:8888/api/graph", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toSend),
        });
        let respData = await response.json();
        setData(respData);
      } catch (err) {
        setError("Error fetching data for graph");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Run only when `url` changes

  // D3 Graph setup
  useEffect(() => {
    if (!data?.nodes) return; // Wait until data is loaded

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
  }, [data]); // Run this effect only when `data` changes

  // Render loading or error states
  if (loading) {
    return (
      <Card className="flex flex-col p-2 gap-3">
        <CardTitle className="m-auto text-foreground w-fit text-[25px]">
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
        <CardTitle className="m-auto text-foreground w-fit text-[25px]">
          Sources network graph
        </CardTitle>
        <CardContent>Error fetching data. Try Again Later</CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className, "w-[100%] flex flex-col p-2 gap-3")}>
      <CardTitle className="m-auto text-foreground w-fit text-[25px]">
        Sources network graph
      </CardTitle>
      <CardContent>
        <svg ref={svgRef}></svg>
      </CardContent>
    </Card>
  );
};

export default NetworkGraph;*/

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  source: string;
  url: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

interface Nodes {
  nodes: Node[];
  links: Link[];
}

interface Props {
  url: string;
  className?: string;
}

const NetworkGraph = ({ url, className }: Props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<Nodes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      const toSend = {
        content: "EMPTY",
        contentUri: url,
        language: "ron",
      };

      try {
        const response = await fetch("http://localhost:8888/api/graph", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toSend),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const respData = (await response.json()) as Nodes;
        setData(respData);
      } catch (err) {
        setError("Error fetching data for graph");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // D3 Graph setup
  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 800;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "none")
      .call(
        d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
          svgGroup.attr("transform", event.transform);
        })
      );

    const svgGroup = svg.append("g");

    const simulation = d3
      .forceSimulation<Node>(data.nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(data.links)
          .id((d) => d.id)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svgGroup
      .append("g")
      .selectAll<SVGLineElement, Link>("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const node = svgGroup
      .append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(data.nodes)
      .join("g")
      .on("click", (_, d) => {
        window.open(d.url, "_blank");
      });

    (node as any)
      .append("circle")
      .attr("r", (_:any, i:any) => (i === 0 ? 15 : 10))
      .attr("fill", (_:any, i:any) => (i === 0 ? "green" : "lightblue"))
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.source);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  // Render loading or error states
  if (loading) {
    return (
      <Card className="flex flex-col p-2 gap-3">
        <CardTitle className="m-auto text-foreground w-fit text-[25px]">
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
        <CardTitle className="m-auto text-foreground w-fit text-[25px]">
          Sources network graph
        </CardTitle>
        <CardContent>Error fetching data. Try Again Later</CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className, "w-[100%] flex flex-col p-2 gap-3")}>
      <CardTitle className="m-auto text-foreground w-fit text-[25px]">
        Sources network graph
      </CardTitle>
      <CardContent>
        <svg ref={svgRef}></svg>
      </CardContent>
    </Card>
  );
};

export default NetworkGraph;
