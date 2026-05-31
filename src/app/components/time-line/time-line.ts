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
  inject
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectionArrowService} from '../../services/direction-arrow.service';
import {DirectionArrowEnum} from '../../enums/direction-arrow.enum';
import {DirectionArrows} from '../direction-arrows/direction-arrows';
import {TranslatePipe} from '@ngx-translate/core';

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
  // top position (px) for the placeholder character
  placeholderTop = signal('0px');

  @ViewChildren('timelineNode', {read: ElementRef}) nodes!: QueryList<ElementRef>;
  @ViewChild('timelineContainer', {read: ElementRef}) containerRef!: ElementRef;

  public directionService = inject(DirectionArrowService);
  constructor() {
    effect(() => {
      const dir = this.directionService.directionSignal();
      if (dir == null) return;

      // navigate up/down
      const current = this.selectedIndex();
      if (dir === DirectionArrowEnum.Up) {
        const next = Math.max(0, current - 1);
        this.selectIndex(next);
      } else if (dir === DirectionArrowEnum.Down) {
        const next = Math.min(Math.max(0, this.items.length - 1), current + 1);
        this.selectIndex(next);
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
      // reset selection when items change
      this.selectIndex(0);
    }
  }

  ngAfterViewInit(): void {
    // ensure placeholder position is correct after view init
    setTimeout(() => this.updatePlaceholder(), 0);
  }

  selectIndex(i: number) {
    if (!this.items || i < 0 || i >= this.items.length) return;
    this.selectedIndex.set(i);
    this.selectionChange.emit(this.items[i]);
    // update placeholder position
    setTimeout(() => this.updatePlaceholder(), 0);
  }

  private updatePlaceholder() {
    const nodes = this.nodes?.toArray();
    if (!nodes || nodes.length === 0) return;
    const idx = this.selectedIndex();
    const el = nodes[idx]?.nativeElement as HTMLElement | undefined;
    const containerEl = this.containerRef?.nativeElement as HTMLElement | undefined;
    if (!el || !containerEl) return;

    // compute position relative to container
    const top = el.offsetTop + el.offsetHeight / 2 ; // 12 ~ half character height
    this.placeholderTop.set(`${top}px`);
  }

}
