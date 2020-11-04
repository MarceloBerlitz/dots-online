export type PlayerType = {
    id: string;
    score: number;
    name: string;
    color: 'red' | 'blue' | 'green' | 'pink' | 'orange' | 'yellow' | 'black' | 'grey' | 'purple' | 'brown' | 'cyan' | 'lime';
    isAdmin: boolean;
    winner: boolean;
}