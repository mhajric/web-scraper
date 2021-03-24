import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LinksDataSource} from '../../../../data/service/links-data-source';
import {LinksService} from '../../../../data/service/links.service';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {Link} from '../../../../data/schema/link';
import {Page} from '../../../../data/schema/page';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit, AfterViewInit, OnDestroy {

  page: Page<Link>;
  dataSource: LinksDataSource;
  dataLoading: boolean;
  dataLoadingSubscription: Subscription;
  displayedColumns = ['Link'];

  filter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private linksService: LinksService) { }

  ngOnDestroy(): void {
    this.dataLoadingSubscription.unsubscribe();
    }

  ngOnInit(): void {
    this.dataSource = new LinksDataSource(this.linksService);
    this.dataLoadingSubscription = this.dataSource.loading$.subscribe(loading => this.dataLoading = loading);
    this.dataSource.loadLinks(this.filter, 0, 5);
     }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadLinks())
      )
      .subscribe();
  }


  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  loadLinks() {
    this.dataSource.loadLinks(this.filter, this.paginator.pageIndex, this.paginator.pageSize);
  }
}
