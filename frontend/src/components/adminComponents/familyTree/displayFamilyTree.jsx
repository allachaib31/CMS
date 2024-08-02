import { getFamilyTreeUseIdFetch, getIdFamilyTreeFetch } from "../../../utils/apiFetch";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const DisplayFamilyTree = () => {
  const [listId, setListId] = useState(false);
  const [id, setId] = useState(false);
  const svgRef = useRef();
  const [svgWidth, setSvgWidth] = useState(0);  // Add state for dynamic width
  useEffect(() => {
    if (id !== false) {
      getFamilyTreeUseIdFetch(id).then((res) => {
        parentFunction(res.data.familyTree.familyTree);
      });
    }
  }, [id]);

  useEffect(() => {
    getIdFamilyTreeFetch().then((res) => {
      setListId(res.data.listId);
    });
  }, []);

  const parentFunction = (data) => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const root = d3.hierarchy(data);
    const nodes = root.descendants();
    const links = root.links();

    const treeLayout = d3.tree()
      .nodeSize([200, 200])  // Adjust node size to control spacing
      .separation((a, b) => a.parent === b.parent ? 1.5 : 2);

    treeLayout(root);

    // Calculate required width and height based on node positions
    const maxX = d3.max(nodes, d => d.x) || 0;
    const maxY = d3.max(nodes, d => d.y) || 0;
    const minX = d3.min(nodes, d => d.x) || 0;
    const minY = d3.min(nodes, d => d.y) || 0;

    const width = maxX - minX + margin.left + margin.right;
    const height = maxY - minY + margin.top + margin.bottom;

    svg.attr('width', width).attr('height', height);
    setSvgWidth(width);  // Update state with the calculated width

    svg.selectAll('*').remove();  // Clear any existing content in the SVG

    const g = svg.append('g').attr('transform', `translate(${margin.left - minX},${margin.top - minY})`);

    // Links
    g.append("g")
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', 'black');

    // Nodes
    g.append("g")
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 15);

    // Labels
    g.append("g")
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => d.x)
      .attr('y', d => d.y - 20)
      .attr("font-size", 20)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name);
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">شجرة العائلة</h1>
        <select
          onChange={(event) => {
            setId(event.target.value);
          }}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            اختر اسم شجرة العائلة
          </option>
          {listId &&
            listId.map((value) => {
              return <option value={value._id}>{value.name}</option>;
            })}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className='flex justify-center items-center' style={{ width: svgWidth }}>
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default DisplayFamilyTree;
