import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

interface ForceGraphProps {
  nodes: Node[];
  links: Link[];
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width || 600;
    const height = 600;

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);

    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    node.append("title")
      .text((d: Node) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // Add panning behavior
    let isDragging = false;
    let startX: number, startY: number;

    svg.on("mousedown", (event) => {
      isDragging = true;
      const { clientX, clientY } = event;
      startX = clientX;
      startY = clientY;
    });

    svg.on("mousemove", (event) => {
      if (isDragging) {
        const { clientX, clientY } = event;
        const dx = clientX - startX;
        const dy = clientY - startY;

        g.attr("transform", `translate(${dx}, ${dy})`);
      }
    });

    svg.on("mouseup", () => {
      isDragging = false;
    });

    svg.on("mouseleave", () => {
      isDragging = false;
    });

  }, [nodes, links]);

  return <svg ref={svgRef} width="100%" height="600"></svg>;
};

export default ForceGraph;