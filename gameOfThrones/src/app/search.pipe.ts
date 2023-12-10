import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    console.log('items: ', items);

    return items.filter(item => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.slug.toLowerCase().includes(searchText)
      );
    });
  }
}
