import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
    selector: 'TreeNode',
    encapsulation: ViewEncapsulation.None,
    styles: [
        '.tree-children { padding-left: 20px }',
        `.node-content-wrapper {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 2px;
      transition: background-color .15s,box-shadow .15s;
    }`,
        `.tree-node {
            border: 1px solid #ddd;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .tree-node:hover {
             box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            }
        `,
        '.node-wrapper {display: flex; align-items: flex-start;}',
        '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
        '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
        '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #2dacd1 }',
        //'.node-content-wrapper:hover { background: #f7fbff }',
        '.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999;}',
        '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
        '.tree-node-expanded > .node-wrapper > .toggle-children-wrapper > .toggle-children { transform: rotate(90deg) }',
        '.tree-node-collapsed > .node-wrapper > .toggle-children-wrapper > .toggle-children { transform: rotate(0deg); }',
        `.toggle-children-wrapper {
                padding: 2px 3px 5px 1px;
    }`,
        `.toggle-children {
        font-size: 20px;
        height: 20px;
        width: 20px;
        background-size: contain;
        display: inline-block;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
    }`,
        `.toggle-children-placeholder {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        top: 1px;
        padding-right: 5px;
    }`
    ],
    template: `
    <div
      *ngIf="!node.isHidden"
      class="card card-block tree-node tree-node-level-{{ node.level }}"
      [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
      [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
      [class.tree-node-leaf]="node.isLeaf"
      [class.tree-node-active]="node.isActive"
      [class.tree-node-focused]="node.isFocused">

      <TreeNodeDropSlot
        *ngIf="nodeIndex === 0"
        [dropIndex]="nodeIndex"
        [node]="node.parent"
        ></TreeNodeDropSlot>

<div class="node-wrapper">
          <span
            *ngIf="node.hasChildren"
            class="toggle-children-wrapper"
            (click)="node.mouseAction('expanderClick', $event)">
    
            <span class="toggle-children ion-android-arrow-dropright-circle"></span>
          </span>
          <span
            *ngIf="!node.hasChildren"
            class="toggle-children-placeholder">
          </span>
          <div class="node-content-wrapper"
            #nodeContentWrapper
            [class.is-dragging-over]="node.treeModel.isDraggingOver(this)"
            (click)="node.mouseAction('click', $event)"
            (dblclick)="node.mouseAction('dblClick', $event)"
            (contextmenu)="node.mouseAction('contextMenu', $event)"
            [draggable]="node.allowDrag()"
            (dragstart)="onDragStart($event)"
            (drop)="onDrop($event)"
            (dragend)="onDragEnd()"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave(nodeContentWrapper, $event)"
            >
            <TreeNodeContent [node]="node" [treeNodeContentTemplate]="treeNodeContentTemplate"></TreeNodeContent>
          </div>
        </div>

      <div class="tree-children" *ngIf="node.isExpanded">
        <div *ngIf="node.children">
          <TreeNode
            *ngFor="let node of node.children; let i = index"
            [node]="node"
            [nodeIndex]="i"
            [treeNodeContentTemplate]="treeNodeContentTemplate"
            [loadingTemplate]="loadingTemplate">
          </TreeNode>
        </div>
        <LoadingComponent
          class="tree-node-loading"
          *ngIf="!node.children"
          [loadingTemplate]="loadingTemplate"
        ></LoadingComponent>
      </div>
      <TreeNodeDropSlot
        [dropIndex]="nodeIndex + 1"
        [node]="node.parent"
        ></TreeNodeDropSlot>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
    @Input() node: TreeNode;
    @Input() nodeIndex: number;
    @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
    @Input() loadingTemplate: TemplateRef<any>;

    // TODO: move to draggable directive
    onDragStart() {
        setTimeout(() => this.node.treeModel.setDragNode({ node: this.node.parent, index: this.nodeIndex }), 30);
    }

    onDragEnd() {
        this.node.treeModel.setDragNode(null);
    }

    onDragOver( $event ) {
        $event.preventDefault();
        this.node.treeModel.setDropLocation({ component: this, node: this.node, index: 0 });
    }

    onDrop( $event ) {
        $event.preventDefault();
        this.node.mouseAction('drop', $event, { node: this.node, index: 0 });
    }

    onDragLeave( nodeContentWrapper, $event ) {
        if ( !this.node.treeModel.isDraggingOver(this) ) return;

        const rect = nodeContentWrapper.getBoundingClientRect();

        // If outside the element
        if ( $event.clientX < rect.left || $event.clientX > rect.right ||
            $event.clientY < rect.top || $event.clientY > rect.bottom ) {

            this.node.treeModel.setDropLocation(null);
        }
    }

    constructor( private elementRef: ElementRef ) {
    }

    ngAfterViewInit() {
        this.node.elementRef = this.elementRef;
    }
}
