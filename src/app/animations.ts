import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadInAnimations = [
    trigger('fadein', [
        state('void', style({ opacity: 0 })),
        transition('void => *', [
            style({ opacity: 0 }),
            animate('900ms 300ms ease-out', style({ opacity: 1 }))
        ])
    ]),
    trigger('slidelefttitle', [
        transition('void => *', [
            style({ opacity: 0, transform: 'translateX(150%)' }),
            animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 },))
        ])
    ])
];