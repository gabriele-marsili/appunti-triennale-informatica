/**
 * Note: The returned array must be malloced, assume caller calls free().
 */


int* twoSum(int* nums, int numsSize, int target, int* returnSize){
   
    int *res ;
    res = malloc(sizeof(int)*2);
    
    for(int i = 0; i<numsSize; i++){
        if(nums[i]<target){
            for(int j = i+1; j<numsSize;j++){
                if(nums[i]+nums[j] == target){
                    res[0] = i;
                    res[1] = j;
                    return res;
                } 
            }
        }
    }
    return 0;
}


int main(int argc, char *argv[])
{
   int a[] = {2,7,11,15};
   int res = twoSum(a, 4, 9, 2);
   printf("%d\n", res);

}