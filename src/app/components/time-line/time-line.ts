import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  effect,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChildren,
  ViewChild,
  QueryList,
  AfterViewInit,
  inject,
  HostListener
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectionArrowService} from '../../services/direction-arrow.service';
import {DirectionArrowEnum} from '../../enums/direction-arrow.enum';
import {DirectionArrows} from '../direction-arrows/direction-arrows';
import {TranslatePipe} from '@ngx-translate/core';
import {SoundService} from '../../services/sound.service';

@Component({
  selector: 'app-time-line',
  imports: [CommonModule, DirectionArrows, TranslatePipe],
  templateUrl: './time-line.html',
  styleUrl: './time-line.scss',
})
export class TimeLine implements OnInit, OnChanges, AfterViewInit {

  @Input() items: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  selectedIndex = signal(0);
  placeholderTop = signal('0px');
  characterLeft = signal(0);
  characterTop = signal(0);


  @ViewChildren('timelineNode', {read: ElementRef}) nodes!: QueryList<ElementRef>;
  @ViewChild('timelineContainer', {read: ElementRef}) containerRef!: ElementRef<HTMLElement>;
  @ViewChild('path', {read: ElementRef}) path?: ElementRef<SVGPathElement>;

  readonly nodeSpacing = 140;
  readonly nodeStartY = 50;

  public directionService = inject(DirectionArrowService);
  constructor() {
    effect(() => {
      const dir = this.directionService.directionSignal();
      if (dir == null) return;

      const current = this.selectedIndex();
      if (dir === DirectionArrowEnum.Up) {
        this.selectIndex(current - 1);
      } else if (dir === DirectionArrowEnum.Down) {
        this.selectIndex(current + 1);
      }

      this.directionService.clear();
    });
  }

  ngOnInit(): void {
    if (this.items?.length) {
      this.selectIndex(0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items?.length) {
      this.selectIndex(0);
      queueMicrotask(() => this.moveCharacterToIndex(this.selectedIndex()));
    }
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.moveCharacterToIndex(this.selectedIndex()));
  }

  @HostListener('window:resize')
  onResize() {
    this.moveCharacterToIndex(this.selectedIndex());
  }

  selectIndex(index: number){
    if (!this.items?.length) return;

    const clamped = Math.max(0, Math.min(index, this.items.length - 1));
    this.selectedIndex.set(clamped);
    this.selectionChange.emit(this.items[clamped]);
    this.moveCharacterToIndex(clamped);
  }

  timelinePath(): string {
    if (!this.items?.length) return '';

    const points: string[] = [];
    this.items.forEach((_, i) => {
      const p = this.getNodePosition(i);
      if (i === 0) {
        points.push(`M ${p.x} ${p.y}`);
      }
      points.push(`L ${p.x} ${p.y}`);
    });

    return points.join(' ');
  }

  nodeY(index: number): number {
    return this.getNodePosition(index).y;
  }

  nodeX(index: number): number {
    return this.getNodePosition(index).x;
  }

  private getNodePosition(index: number): { x: number; y: number } {
    const containerWidth = this.containerRef?.nativeElement?.clientWidth ?? 0;
    const left = containerWidth * 0.43;
    const right = containerWidth * 0.57;
    const y = index * this.nodeSpacing + this.nodeStartY;

    return {
      x: index % 2 === 0 ? left : right,
      y
    };
  }

  private moveCharacterToIndex(index: number) {
    if (!this.items?.length) return;

    const point = this.getNodePosition(index);
    this.characterLeft.set(point.x);
    this.characterTop.set(point.y);
  }

  private updatePlaceholder() {
    const nodes = this.nodes?.toArray();
    if (!nodes || nodes.length === 0) return;
    const idx = this.selectedIndex();
    const el = nodes[idx]?.nativeElement as HTMLElement | undefined;
    const containerEl = this.containerRef?.nativeElement as HTMLElement | undefined;
    if (!el || !containerEl) return;

    const top = el.offsetTop + el.offsetHeight / 2;
    this.placeholderTop.set(`${top}px`);
  }

}
